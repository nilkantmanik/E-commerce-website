class ApiFeatures {

    constructor(query,querystr){
        this.query=query;
        this.querystr=querystr;
    }

    search(){
        const keyword = this.querystr.keyword ? {
            name:{
                $regex:this.querystr.keyword,
                $options:"i",  // case insensitive
            }
        }:{};

        

        this.query = this.query.find({...keyword});
        return this;
    }

    filter(){
        const querycopy = {...this.querystr}  // copy of original querystr
                
        //remove some feilds for category 
        const removeFeilds = ["keyword","page","limit"]
        removeFeilds.forEach(key => delete querycopy[key])

        let querystr = JSON.stringify(querycopy)
        querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g , (key) => `$${key}`);  // convert lt to $lt

        this.query = this.query.find(JSON.parse(querystr))   // 

        return this;
    }

    pagination(resultperpage){
        const currentpage = Number(this.querystr.page) || 1;

        const skip = resultperpage * (currentpage-1);   // logic for skipping no of product based on page and products per page

        this.query = this.query.limit(resultperpage).skip(skip);
        return this;
    }


};

module.exports = ApiFeatures;

