import { cva, type VariantProps } from 'class-variance-authority'

export { default as Button } from './Button.vue'

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\'size-\'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive duration-200 ease-in-out cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-prime-500 md:hover:bg-prime-600 text-white',
        destructive:
          'bg-destructive text-white shadow-xs md:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs md:hover:bg-accent md:hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:md:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs md:hover:bg-secondary/80',
        ghost:
          'md:hover:bg-accent md:hover:text-accent-foreground dark:md:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 md:hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
