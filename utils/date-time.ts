export const getCurrentDateTimeYYMMDDHHmmss = (): string => {

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toISOString().replace(/-|T|:|\..+/g, '').slice(2, 14);
    
    var id = '59cb14a6-e8de-4615-9c9d-'
    return id += formattedDateTime;
}