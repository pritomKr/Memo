import fs from 'fs';


export const createCategoryController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/category.jsonl';
        const cat = req.body.categoryName;

        // Check if the string contains any letters
        const regex = /[a-zA-Z]/;

        if (!regex.test(cat)) {
            res.send({
                success: false,
                message: "Doesn't contain any letter",
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
                if(existingObject.name == cat){
                    res.send({
                        success: false,
                        message: "Please Enter new category",
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
          
            // Create the new object with the incremented ID
        const newObject = {
          id: newId,
          name: cat, // Change this to the desired name
        };
          
            // Convert the new object to a JSON string
        const newObjectJson = JSON.stringify(newObject);

        // Append the new object JSON string to the JSONL file
        await fs.promises.appendFile(filePath, newObjectJson + '\n', 'utf8');

        res.send({
            success: true,
            message: "Category Created Successfully",
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












//get all category controller
export const categoryController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/category.jsonl';

        // Read file asynchronously
        const cat_string = await fs.promises.readFile(filePath, 'utf8');

        let category = [];
        if (cat_string !== '') {
            // Parse each line of the file to extract the objects
            const cat_middle_obj = cat_string.trim().split('\n');
            category = cat_middle_obj.map(jsonString => JSON.parse(jsonString));
        }

        res.status(200).send({
            success: true,
            message: 'All categories List',
            category,
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
export const deleteCategoryController = async (req, res) => {
    try {
        const { cat } = req.params;
        const filePath = 'D:/MERN-STACK/MEMO/database/category.jsonl';

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
                return existingObject.name !== cat;
            });

            // Write the filtered lines back to the file
            await fs.promises.writeFile(filePath, filteredLines.join('\n') + '\n');
        }

        res.send({
            success: true,
            message: "Category Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error while deleting category',
            error,
        });
    }
};