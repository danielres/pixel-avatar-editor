import { REGEX_ONLY_LETTERS_NUMBERS_AND_SPACES, capitalizeFirstLetter } from '$lib/utils/string'
import { z } from 'zod'

export const setUsernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Too short (min 3 characters).' })
    .max(12, { message: 'Too long (max 12 characters).' })
    .regex(REGEX_ONLY_LETTERS_NUMBERS_AND_SPACES, {
      message: 'Please use only letters, numbers and spaces.',
    })
    .transform((val) => val.trim())
    .transform(capitalizeFirstLetter),
})
