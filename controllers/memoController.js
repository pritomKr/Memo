import fs from 'fs';


export const createMemoController = async (req, res) => {
    try {
        const filePath = 'D:/MERN-STACK/MEMO/database/memo.jsonl';
        const items = req.body.items;
        const { cus } = req.params;
        const cus_details=cus.split("$");

        // Check if the string contains any letters
        const regex = /[a-zA-Z]/;

        if (!regex.test(items)) {
            res.send({
                success: false,
                message: "Please add item",
            });
            return;
        }

        // Read file asynchronously
        const data = await fs.promises.readFile(filePath, 'utf8');

        let lastId = 0;
          
            // Parse each line of the file to extract the objects
        const lines = data.trim().split('\n');

        // if(lines[0] != ''){
        //     for (let i = 0; i < lines.length; i++) {
        //         const existingObject = JSON.parse(lines[i]);
        //         if(existingObject.name == items){
        //             res.send({
        //                 success: false,
        //                 message: "Please Enter new category",
        //             });
        //             return;
        //         }
        //     }
        // }
            
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


        if(cus_details[0] ==''){
            res.send({
                success: false,
                message: "Enter customer Name",
                error,
            });
        }

        if(cus_details[1] ==''){
            res.send({
                success: false,
                message: "Enter customer Address",
                error,
            });
        }

        if(cus_details[2] ==''){
            res.send({
                success: false,
                message: "Enter customer Mobile Number",
                error,
            });
        }

        let updatedItems = [];
        for (let i = 0; i < items.length; i++) {
            if((items[i].productId != null) && (items[i].quantity != 0)){
                updatedItems.push(items[i]);
            }
        }

        
        const newObject = {
          id: newId,
          cusName: cus_details[0],
          cusAddress: cus_details[1],
          cusNumber: cus_details[2],
          items: updatedItems, // Change this to the desired name
        };
          
            // Convert the new object to a JSON string
        const newObjectJson = JSON.stringify(newObject);

        // Append the new object JSON string to the JSONL file
        await fs.promises.appendFile(filePath, newObjectJson + '\n', 'utf8');

        res.send({
            success: true,
            message: "Category Created Successfully",
            newObject
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




export const getOneMemoController = async (req, res) => {
    try {
        const { mid } = req.params;
        const filePath = 'D:/MERN-STACK/MEMO/database/memo.jsonl';

        // Read file asynchronously
        const memo_string = await fs.promises.readFile(filePath, 'utf8');

        if (memo_string !== '') {
            // Parse each line of the file to extract the objects
            const memo_middle_obj = memo_string.trim().split('\n');
            // product = prod_middle_obj.map(jsonString => JSON.parse(jsonString));
            for (let i = 0; i < memo_middle_obj.length; i++) {
                const memoObj=JSON.parse(memo_middle_obj[i])
                if(memoObj.id == mid){
                    var memo=memoObj;
                }
            }
            
        }
        

        res.status(200).send({
            success: true,
            message: 'All Products List',
            memo,
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