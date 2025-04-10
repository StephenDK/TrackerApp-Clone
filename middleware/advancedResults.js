const advancedResults = (model) => async (req, res, next) => {
    try {
      // Getting query params
      // Example of a query params /api/v1/bootcamps/?location.state=MA&housing=true
      // console.log(req.query);
  
      // Setting up selecting and sorting
      // copy req.query
      let reqQuery = { ...req.query };
      // console.log('18. reqQuery ', reqQuery)
  
      // Fields to exclude
      const removeFields = ["select", "sort", "page", "limit"];
      // console.log(removeFields);
      // Loop over removeFields and delete them from reqQuery
      removeFields.forEach((param) => delete reqQuery[param]);
      // console.log(removeFields);
  
      // // Query mongodb using greater then and less then
  
      // Take the query object and stringify it.
      let queryStr = JSON.stringify(reqQuery);
      // console.log('32. QUERY STRING BEFORE: ',typeof(queryStr), queryStr);
      // console.log(queryStr);
      // Take the string and replace a $ before the query selector
  
      // Name	Description
      // $eq	Matches values that are equal to a specified value.
      // $gt	Matches values that are greater than a specified value.
      // $gte	Matches values that are greater than or equal to a specified value.
      // $in	Matches any of the values specified in an array.
      // $lt	Matches values that are less than a specified value.
      // $lte	Matches values that are less than or equal to a specified value.
      // $ne	Matches all values that are not equal to a specified value.
      // $nin	Matches none of the values specified in an array.
  
      queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
      );
      // console.log('47. QUERY STRING: AFTER', typeof(queryStr), queryStr);
  
      let query = model.find(JSON.parse(queryStr));
      // The populate with courses is a mongoose VirtualType. its setup in ./models.Bootcamp.js
  
      // console.log('req.query.select: ', req.query.select);
  
      // // //Select Felds
      // if (req.query.select) {
      //   // URL selection example
      //   // /api/v1/bootcamps?select=name,description,housing
      //   // URL with query using list above
      //   // /api/v1/bootcamps?select=name,description,housing&averageCost[gte]=10000
      //   const fields = req.query.select.split(",").join(" ");
      //   // console.log('57. fields: ',fields);
      //   // console.log(query);
      //   query = query.select(fields);
      //   // console.log(query);
      // }
  
      if (req.query.sort) {
        // Sort URL example
        // /api/v1/bootcamps?select=name,description,housing&sort=name
        // for decending put - in front of the sort=-name
        // console.log(typeo(req.query.sort));
        const sortBy = req.query.sort.split(",").join(" ");
        console.log(typeof query);
        // console.log(query[0]);
        console.log(sortBy);
        query = query.sort(req.query.sort);
      } else {
        query = query.sort("-createdAt");
      }
  
      // console.log(bootcamps)
      const data = await query;
      // Pagination result
  
      res.advancedResults = {
        success: true,
        count: query.length,
        data
      };
  
      next();
    } catch (err) {
      console.log(err);
      next();
    }
  };
  
  module.exports = advancedResults;
  