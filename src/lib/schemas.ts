import { z } from 'zod'

const tomorrow = new Date()
tomorrow.setDate(tomorrow.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

export const roomTypeOptions = [
  { value: 'duplex-triple', label: 'Duplex Cottage — Triple' },
  { value: 'duplex-quad', label: 'Duplex Cottage — Quad' },
  { value: 'private', label: 'Private Room' },
  { value: 'dorm', label: 'Unisex Dorm' },
] as const

export const mealPlanOptions = [
  { value: 'room-only', label: 'Room Only' },
  { value: 'cp-plan', label: 'CP Plan (Breakfast)' },
  { value: 'full-board', label: 'Full Board' },
] as const

export const sourceOptions = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'google', label: 'Google Search' },
  { value: 'friend', label: 'Friend / Family' },
  { value: 'blog', label: 'Travel Blog' },
  { value: 'ota', label: 'Booking Site (Airbnb, etc.)' },
  { value: 'other', label: 'Other' },
] as const

export const step1Schema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(80, 'Name is too long')
    .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters and spaces'),
  email: z.string().email('Please enter a valid email'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  city: z.string().max(60).optional().or(z.literal('')),
  website: z.string().max(0, 'This field must be empty').optional().or(z.literal('')),
})

export const step2Schema = z
  .object({
    checkin: z.string().min(1, 'Check-in date is required'),
    checkout: z.string().min(1, 'Check-out date is required'),
    roomType: z.enum(
      ['duplex-triple', 'duplex-quad', 'private', 'dorm'],
      { message: 'Please select a room type' },
    ),
    guests: z
      .number({ message: 'Number of guests is required' })
      .int()
      .min(1, 'At least 1 guest')
      .max(8, 'Maximum 8 guests'),
    mealPlan: z.enum(['room-only', 'cp-plan', 'full-board'], {
      message: 'Please select a meal plan',
    }),
    requests: z.string().max(400, 'Maximum 400 characters').optional().or(z.literal('')),
    source: z
      .enum(['instagram', 'google', 'friend', 'blog', 'ota', 'other'])
      .optional(),
  })
  .refine(
    (data) => {
      if (!data.checkin || !data.checkout) return true
      return new Date(data.checkout) > new Date(data.checkin)
    },
    { message: 'Check-out must be after check-in', path: ['checkout'] },
  )

export const fullFormSchema = step1Schema.merge(
  z.object({
    checkin: z.string().min(1),
    checkout: z.string().min(1),
    roomType: z.enum(['duplex-triple', 'duplex-quad', 'private', 'dorm']),
    guests: z.number().int().min(1).max(8),
    mealPlan: z.enum(['room-only', 'cp-plan', 'full-board']),
    requests: z.string().max(400).optional().or(z.literal('')),
    source: z
      .enum(['instagram', 'google', 'friend', 'blog', 'ota', 'other'])
      .optional(),
  }),
)

export type Step1Data = z.infer<typeof step1Schema>
export type FullFormData = z.infer<typeof fullFormSchema>
