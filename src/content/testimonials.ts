export const testimonialKeys = ["one", "two", "three"] as const;
export type TestimonialKey = (typeof testimonialKeys)[number];
