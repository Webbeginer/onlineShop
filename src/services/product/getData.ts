export const getData= async (url: string)=> {
    // const res = await fetch("https://fakestoreapi.com/products");
    const res= await fetch(url ,
         {
            cache:"force-cache",
            // revalidate menggunakan times
            //  next: {revalidate: 60}

            // revalidate manual
            next: {
                tags: ["update"],
            }
            });
   if(!res.ok){
    throw new Error("Failed to fetch data");
   }
   return res.json();
  
}