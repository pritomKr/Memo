import fs from 'fs';


export const createProductController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';
        // const category = req.body.category;
        // const photo = req.body.photo;
        // const name = req.body.name;
        // const description = req.body.description;
        // const price = req.body.price;
        // console.log(photo)
        const {name,description,price,category} = req.fields;
        const {photo} = req.files;
        console.log(photo)

        // Check if the string contains any letters
        const regex = /[a-zA-Z]/;

        if (!regex.test(name)) {
            res.send({
                success: false,
                message: "Please enter product name",
            });
            return;
        }

        if (!regex.test(description)) {
            res.send({
                success: false,
                message: "Please enter product description",
            });
            return;
        }

        if (!regex.test(category)) {
            res.send({
                success: false,
                message: "Please enter product category",
            });
            return;
        }

        // Read file asynchronously
        const data = await fs.promises.readFile(filePath, 'utf8');

        let lastId = 0;
          
            // Parse each line of the file to extract the objects
        const lines = data.trim().split('\n');

        if(lines[0] != ''){
            for (let i = 0; i < lines.length; i++) {
                const existingObject = JSON.parse(lines[i]);
                if((existingObject.name == name) && (existingObject.category == category)){
                    res.send({
                        success: false,
                        message: "Please Enter new product name",
                    });
                    return;
                }
            }
        }
            
        if(lines==''){
            lines.length=0;
        }
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const lastObject = JSON.parse(lastLine);
            lastId = lastObject.id;
        }
          
            // Increment the last ID to create a new one
        const newId = lastId + 1;
          
        const newObject = {
          id: newId,
          category,photo,name,description,price
        };

        
          
            // Convert the new object to a JSON string
        const newObjectJson = JSON.stringify(newObject);
        console.log(newObjectJson)

        // Append the new object JSON string to the JSONL file
        await fs.promises.appendFile(filePath, newObjectJson + '\n', 'utf8');

        res.send({
            success: true,
            message: "Product Created Successfully",
        });

    } catch (error) {
        console.error('Error:', error);
        res.send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};




//get all product controller

export const getAllProductController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';

        // Read file asynchronously
        const prod_string = await fs.promises.readFile(filePath, 'utf8');

        let product = [];
        if (prod_string !== '') {
            // Parse each line of the file to extract the objects
            const prod_middle_obj = prod_string.trim().split('\n');
            product = prod_middle_obj.map(jsonString => JSON.parse(jsonString));
            
        }
        

        res.status(200).send({
            success: true,
            message: 'All Products List',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,
        });
    }
};



//get one category product controller

export const getOneCatProductController = async (req, res) => {
    try {
        const { cat } = req.params;
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';

        // Read file asynchronously
        const prod_string = await fs.promises.readFile(filePath, 'utf8');

        let product = [];
        if (prod_string !== '') {
            // Parse each line of the file to extract the objects
            const prod_middle_obj = prod_string.trim().split('\n');
            // product = prod_middle_obj.map(jsonString => JSON.parse(jsonString));
            for (let i = 0; i < prod_middle_obj.length; i++) {
                const prodObj=JSON.parse(prod_middle_obj[i])
                if(prodObj.category == cat){
                    product.push(prodObj)
                }
            }
            
        }
        

        res.status(200).send({
            success: true,
            message: 'All Products List',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,
        });
    }
};








//get one product controller

export const getOneProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';

        // Read file asynchronously
        const prod_string = await fs.promises.readFile(filePath, 'utf8');

        if (prod_string !== '') {
            // Parse each line of the file to extract the objects
            const prod_middle_obj = prod_string.trim().split('\n');
            // product = prod_middle_obj.map(jsonString => JSON.parse(jsonString));
            for (let i = 0; i < prod_middle_obj.length; i++) {
                const prodObj=JSON.parse(prod_middle_obj[i])
                if(prodObj.id == pid){
                    var product=prodObj;
                }
            }
            
        }
        

        res.status(200).send({
            success: true,
            message: 'All Products List',
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while getting all categories",
            error,
        });
    }
};



// delete category
export const deleteProductController = async (req, res) => {
    try {
        const { pid } = req.params;
        console.log(pid)
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';

        // Read file asynchronously
        const data = await fs.promises.readFile(filePath, 'utf8');

        // Parse each line of the file to extract the objects
        const lines = data.trim().split('\n');

        if (lines.length === 1) {
            // If there's only one line, just overwrite the file with an empty string
            await fs.promises.writeFile(filePath, '');
        } else {
            // Filter out the lines that don't match the category
            const filteredLines = lines.filter(line => {
                const existingObject = JSON.parse(line);
                return existingObject.id !== parseInt(pid);
            });

            // Write the filtered lines back to the file
            await fs.promises.writeFile(filePath, filteredLines.join('\n') + '\n');
        }

        res.send({
            success: true,
            message: "Product Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting Product',
            error,
        });
    }
};




export const updateProductController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/product.jsonl';
        const { pid } = req.params;
        const {name,description,price,category} = req.fields;
        var {photo} = req.files;
        
        

        // Check if the string contains any letters
        const regex = /[a-zA-Z]/;

        if (!regex.test(name)) {
            res.send({
                success: false,
                message: "Please enter product name",
            });
            return;
        }

        if (!regex.test(description)) {
            res.send({
                success: false,
                message: "Please enter product description",
            });
            return;
        }

        if (!regex.test(category)) {
            res.send({
                success: false,
                message: "Please enter product category",
            });
            return;
        }

        // Read file asynchronously
        const data = await fs.promises.readFile(filePath, 'utf8');

        let lastId = 0;
          
            // Parse each line of the file to extract the objects
        const lines = data.trim().split('\n');

        if(lines[0] != ''){
            for (let i = 0; i < lines.length; i++) {
                const existingObject = JSON.parse(lines[i]);
                if(existingObject.id !== parseInt(pid)){
                    if((existingObject.name == name) && (existingObject.category == category)){
                        res.send({
                            success: false,
                            message: "Please Enter new product name",
                        });
                        return;
                    }
                }
            }
        }
            
        if(lines==''){
            lines.length=0;
        }
        if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            const lastObject = JSON.parse(lastLine);
            lastId = lastObject.id;
        }

        if(photo==null){
            for (let i = 0; i < lines.length; i++) {
                const existingObject = JSON.parse(lines[i]);
                if(existingObject.id === parseInt(pid)){
                    photo = existingObject.photo;
                }
            }
        }
          
            // Increment the last ID to create a new one
        // const newId = lastId + 1;
        const newObject = {
          id: parseInt(pid),
          category,photo,name,description,price
        };


        if (lines.length === 1) {
            // If there's only one line, just overwrite the file with an empty string
            await fs.promises.writeFile(filePath, '');
        } else {
            await fs.promises.writeFile(filePath, '');
            for (let i = 0; i < lines.length; i++) {
                const existingObject = JSON.parse(lines[i]);
                if(existingObject.id === parseInt(pid)){
                    const newObjectJson = JSON.stringify(newObject);
                    await fs.promises.appendFile(filePath, newObjectJson + '\n', 'utf8');

                }else{
                    const existingObjectJson = JSON.stringify(existingObject);
                    await fs.promises.appendFile(filePath, existingObjectJson + '\n', 'utf8');
                }
            }

            // Write the filtered lines back to the file
            // await fs.promises.writeFile(filePath, filteredLines.join('\n') + '\n');
        }
        
          
            // Convert the new object to a JSON strin

        // Append the new object JSON string to the JSONL file
        // await fs.promises.appendFile(filePath, newObjectJson + '\n', 'utf8');

        // await fs.promises.writeFile(filePath, fullObjectJson.join('\n') + '\n');

        res.send({
            success: true,
            message: "Product Updated Successfully",
        });

    } catch (error) {
        console.error('Error:', error);
        res.send({
            success: false,
            message: "Something went wrong",
            error,
        });
    }
};