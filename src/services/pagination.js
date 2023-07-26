// Defining a function called paginate that takes in a page number and page size
// Exporting the paginate function for use in other modules
export function paginate(page, size) {
// Setting the default page number to 1 if it is not provided or less than or equal to 0
    if (!page || page <= 0) {
        page = 1
    }
// Setting the default page size to 2 if it is not provided or less than or equal to 0
    if (!size || size <= 0) {
        size = 2
    }
 // Calculating the number of items to skip based on the page number and page size
    const skip = (page - 1) * size
    // Returning an object containing the page size and number of items to skip
    return { limit: size, skip }
}