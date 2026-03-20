'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, Send, Check, Pencil, MessageCircle } from 'lucide-react'
import {
  fullFormSchema,
  roomTypeOptions,
  mealPlanOptions,
  sourceOptions,
  type FullFormData,
} from '@/lib/schemas'
import { formatPrice } from '@/data/rooms'

type FormStep = 1 | 2 | 3
type FormState = 'filling' | 'submitting' | 'success' | 'error'

const slideVariants = {
  enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
}

const priceMap: Record<string, number> = {
  'duplex-triple': 4800,
  'duplex-quad': 6000,
  private: 2000,
  dorm: 700,
}

function estimateCost(data: Partial<FullFormData>): number | null {
  if (!data.checkin || !data.checkout || !data.roomType) return null
  const nights = Math.max(
    1,
    Math.ceil(
      (new Date(data.checkout).getTime() - new Date(data.checkin).getTime()) /
        86400000,
    ),
  )
  const base = priceMap[data.roomType] ?? 0
  if (data.roomType === 'dorm') {
    return base * nights * (data.guests ?? 1)
  }
  return base * nights
}

export default function MultiStepForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [direction, setDirection] = useState(1)
  const [formState, setFormState] = useState<FormState>('filling')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  const form = useForm<FullFormData>({
    resolver: zodResolver(fullFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      city: '',
      website: '',
      checkin: '',
      checkout: '',
      roomType: undefined,
      guests: 2,
      mealPlan: 'room-only',
      requests: '',
      source: undefined,
    },
    mode: 'onBlur',
  })

  const { register, handleSubmit, formState: { errors }, watch, trigger, setValue } = form
  const watchAll = watch()

  const goToStep = async (target: FormStep) => {
    if (target > step) {
      const valid =
        step === 1
          ? await trigger(['name', 'email', 'phone', 'city', 'website'])
          : step === 2
            ? await trigger(['checkin', 'checkout', 'roomType', 'guests', 'mealPlan'])
            : true
      if (!valid) return
    }
    setDirection(target > step ? 1 : -1)
    setStep(target)
  }

  const onSubmit = async (data: FullFormData) => {
    if (data.website && data.website.length > 0) return

    setFormState('submitting')

    // Format labels for the message
    const roomLabel = roomTypeOptions.find((o) => o.value === data.roomType)?.label || data.roomType
    const mealLabel = mealPlanOptions.find((o) => o.value === data.mealPlan)?.label || data.mealPlan
    const checkinDate = new Date(data.checkin).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    const checkoutDate = new Date(data.checkout).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })

    const message = `*Shasha Jibhi Enquiry* 🏔️

*Guest Details*
• Name: ${data.name}
• Email: ${data.email}
• Phone: +91 ${data.phone}
• City: ${data.city || 'Not specified'}

*Stay Details*
• Room: ${roomLabel}
• Dates: ${checkinDate} to ${checkoutDate}
• Guests: ${data.guests}
• Meal Plan: ${mealLabel}

*Message/Requests:*
${data.requests || 'None'}`

    const url = `https://wa.me/918899543976?text=${encodeURIComponent(message)}`
    setWhatsappUrl(url)

    // Brief delay to show submission state
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Open WhatsApp
    window.open(url, '_blank')
    setFormState('success')
  }

  if (formState === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-12"
      >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-forest/10 text-forest">
          <Check size={32} />
        </div>
        <h2 className="font-accent text-3xl sm:text-4xl text-forest mb-4">
          Your story begins here.
        </h2>
        <p className="text-midnight/60 leading-relaxed max-w-md mx-auto">
          We&apos;ve received your enquiry and will get back to you within a few
          hours with availability and a personalised quote.
        </p>
        <div className="mt-8">
          <a
            href={whatsappUrl || 'https://wa.me/918899543976'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-forest-dark hover:shadow-md"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </motion.div>
    )
  }

  return (
    <div>
      {/* Step Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3].map((s) => (
            <button
              key={s}
              onClick={() => s < step && goToStep(s as FormStep)}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                s === step
                  ? 'text-forest'
                  : s < step
                    ? 'text-forest/60 cursor-pointer hover:text-forest'
                    : 'text-midnight/30 cursor-default'
              }`}
              aria-current={s === step ? 'step' : undefined}
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                  s === step
                    ? 'bg-forest text-white'
                    : s < step
                      ? 'bg-forest/10 text-forest'
                      : 'bg-parchment-dark text-midnight/30'
                }`}
              >
                {s < step ? <Check size={14} /> : s}
              </span>
              <span className="hidden sm:inline">
                {s === 1 ? 'Details' : s === 2 ? 'Preferences' : 'Review'}
              </span>
            </button>
          ))}
        </div>
        <div className="h-1 bg-parchment-dark rounded-full overflow-hidden">
          <div
            className="h-full bg-forest rounded-full transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Honeypot */}
        <input
          {...register('website')}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 overflow-hidden pointer-events-none"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait" custom={direction}>
          {step === 1 && (
            <motion.div
              key="step1"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-forest-dark">
                Tell Us About Yourself
              </h2>

              <FormField label="Full Name" error={errors.name?.message} required>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="Your full name"
                  className="form-input"
                />
              </FormField>

              <FormField label="Email" error={errors.email?.message} required>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="your@email.com"
                  className="form-input"
                />
              </FormField>

              <FormField label="Phone" error={errors.phone?.message} required>
                <div className="flex">
                  <span className="inline-flex items-center rounded-l-lg border border-r-0 border-parchment-dark bg-ivory px-3 text-sm text-midnight/50">
                    +91
                  </span>
                  <input
                    {...register('phone')}
                    type="tel"
                    placeholder="9876543210"
                    className="form-input rounded-l-none"
                  />
                </div>
              </FormField>

              <FormField label="City" error={errors.city?.message}>
                <input
                  {...register('city')}
                  type="text"
                  placeholder="Where are you from?"
                  className="form-input"
                />
              </FormField>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-forest-dark hover:shadow-md active:scale-[0.98]"
                >
                  Next: Stay Preferences <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              <h2 className="font-display text-2xl font-bold text-forest-dark">
                Stay Preferences
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Check-in" error={errors.checkin?.message} required>
                  <input
                    {...register('checkin')}
                    type="date"
                    min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
                    className="form-input"
                  />
                </FormField>
                <FormField label="Check-out" error={errors.checkout?.message} required>
                  <input
                    {...register('checkout')}
                    type="date"
                    min={watchAll.checkin || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]}
                    className="form-input"
                  />
                </FormField>
              </div>

              <FormField label="Room Type" error={errors.roomType?.message} required>
                <div className="grid grid-cols-2 gap-3">
                  {roomTypeOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition-all ${
                        watchAll.roomType === opt.value
                          ? 'border-forest bg-forest/5 shadow-sm'
                          : 'border-parchment-dark hover:border-forest/30'
                      }`}
                    >
                      <input
                        type="radio"
                        {...register('roomType')}
                        value={opt.value}
                        className="sr-only"
                      />
                      <span
                        className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                          watchAll.roomType === opt.value
                            ? 'border-forest bg-forest'
                            : 'border-parchment-dark'
                        }`}
                      >
                        {watchAll.roomType === opt.value && (
                          <Check size={12} className="text-white" />
                        )}
                      </span>
                      <span className="text-sm text-midnight/80">
                        {opt.label}
                      </span>
                    </label>
                  ))}
                </div>
              </FormField>

              <div className="grid grid-cols-2 gap-4">
                <FormField label="Guests" error={errors.guests?.message} required>
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => {
                        const current = watchAll.guests ?? 2
                        if (current > 1) setValue('guests', current - 1)
                      }}
                      className="h-10 w-10 rounded-l-lg border border-r-0 border-parchment-dark bg-ivory text-midnight/60 hover:bg-parchment-dark transition-colors flex items-center justify-center"
                    >
                      −
                    </button>
                    <input
                      {...register('guests', { valueAsNumber: true })}
                      type="number"
                      min={1}
                      max={8}
                      className="form-input rounded-none text-center w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const current = watchAll.guests ?? 2
                        if (current < 8) setValue('guests', current + 1)
                      }}
                      className="h-10 w-10 rounded-r-lg border border-l-0 border-parchment-dark bg-ivory text-midnight/60 hover:bg-parchment-dark transition-colors flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </FormField>

                <FormField label="Meal Plan" error={errors.mealPlan?.message} required>
                  <select {...register('mealPlan')} className="form-input">
                    {mealPlanOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Special Requests" error={errors.requests?.message}>
                <textarea
                  {...register('requests')}
                  rows={3}
                  maxLength={400}
                  placeholder="Dietary needs, celebrations, accessibility requirements..."
                  className="form-input resize-none"
                />
                <span className="text-xs text-midnight/30 mt-1 block text-right">
                  {watchAll.requests?.length ?? 0}/400
                </span>
              </FormField>

              <FormField label="How did you hear about us?">
                <select {...register('source')} className="form-input">
                  <option value="">Select (optional)</option>
                  {sourceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </FormField>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-forest text-forest px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-forest hover:text-white"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="button"
                  onClick={() => goToStep(3)}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-forest-dark hover:shadow-md active:scale-[0.98]"
                >
                  Review & Submit <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-6"
            >
              <h2 className="font-display text-2xl font-bold text-forest-dark">
                Review Your Enquiry
              </h2>

              {/* Personal Details */}
              <ReviewSection
                title="Personal Details"
                onEdit={() => goToStep(1)}
                rows={[
                  ['Name', watchAll.name],
                  ['Email', watchAll.email],
                  ['Phone', `+91 ${watchAll.phone}`],
                  ...(watchAll.city ? [['City', watchAll.city] as [string, string]] : []),
                ]}
              />

              {/* Stay Preferences */}
              <ReviewSection
                title="Stay Preferences"
                onEdit={() => goToStep(2)}
                rows={[
                  ['Check-in', watchAll.checkin ? new Date(watchAll.checkin).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
                  ['Check-out', watchAll.checkout ? new Date(watchAll.checkout).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : '—'],
                  ['Room', roomTypeOptions.find((o) => o.value === watchAll.roomType)?.label ?? '—'],
                  ['Guests', String(watchAll.guests ?? '—')],
                  ['Meal Plan', mealPlanOptions.find((o) => o.value === watchAll.mealPlan)?.label ?? '—'],
                  ...(watchAll.requests ? [['Requests', watchAll.requests] as [string, string]] : []),
                ]}
              />

              {/* Estimated Cost */}
              {estimateCost(watchAll) && (
                <div className="bg-amber/5 border border-amber/20 rounded-xl p-5">
                  <div className="text-sm text-midnight/50 mb-1">
                    Estimated stay cost
                  </div>
                  <div className="font-editorial text-2xl font-bold text-forest">
                    From {formatPrice(estimateCost(watchAll)!)}
                  </div>
                  <div className="text-xs text-midnight/40 mt-1">
                    Final amount confirmed by host based on availability and
                    seasonal pricing
                  </div>
                </div>
              )}

              {formState === 'error' && (
                <div
                  role="alert"
                  className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700"
                >
                  Something went wrong. Please try again or contact us directly
                  at{' '}
                  <a
                    href="tel:+918899543976"
                    className="font-semibold underline"
                  >
                    +91 8899543976
                  </a>
                  .
                </div>
              )}

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => goToStep(2)}
                  className="inline-flex items-center gap-2 rounded-full border-2 border-forest text-forest px-5 py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-forest hover:text-white"
                >
                  <ArrowLeft size={16} /> Back
                </button>
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="inline-flex items-center gap-2 rounded-full bg-forest px-8 py-3.5 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-forest-dark hover:shadow-md active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none"
                >
                  {formState === 'submitting' ? (
                    <>
                      <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Enquiry <Send size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  )
}

function FormField({
  label,
  error,
  required,
  children,
}: {
  label: string
  error?: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-midnight/70 mb-1.5">
        {label}
        {required && <span className="text-amber ml-0.5">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="text-xs text-red-600 mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

function ReviewSection({
  title,
  onEdit,
  rows,
}: {
  title: string
  onEdit: () => void
  rows: [string, string][]
}) {
  return (
    <div className="bg-white rounded-xl border border-parchment-dark p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-editorial text-base font-semibold text-midnight">
          {title}
        </h3>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-1 text-xs text-forest hover:text-forest-dark transition-colors"
        >
          <Pencil size={12} /> Edit
        </button>
      </div>
      <dl className="space-y-2">
        {rows.map(([key, value]) => (
          <div key={key} className="flex justify-between text-sm">
            <dt className="text-midnight/50">{key}</dt>
            <dd className="text-midnight/80 font-medium text-right max-w-[60%]">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
