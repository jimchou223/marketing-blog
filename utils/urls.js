export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'
export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_601D07FA2F29B751'
/**
 * Given an image return the url
 * works for local and deployed strapis
 * @param {any} image 
 */
export const fromImageToUrl = (image) => {
    if(!image) {
        return "/vercel.svg"
    }

    if (image.url.indexOf('/') === 0) {
        return `${API_URL}${image.url}`
    }

    return image.url
}