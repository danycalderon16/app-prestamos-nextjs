export { default } from 'next-auth/middleware'

export const config = { matcher: ["/",'/loans','/deletes',"/completed"] }