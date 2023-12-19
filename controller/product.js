const firestore = require('../dbConfig')
const ProductDetails = firestore.collection('products');
const userCollection = firestore.collection('users');

exports.addProduct = async (req, res, next) => {
  const { productId, productName, description, size, discountPrice, price, color } = req.body;
  try {
    if(  !productName|| !description|| !size|| !discountPrice|| !price|| !color){
      throw "Missing Crediencial"
    }

    const productImage = [];
    if (req.files) {
      for (var i = 0; i < req.files.length; i++) {
        const subjectUrl1 = `http://localhost:1234` + "/uploads/product/" + req.files[i].filename;
        productImage.push(subjectUrl1.split("\\").join("/"))
          // reqFiles.push('uploads/post/' + req.files[i].filename)
      }    
  }

    // const subjectUrl1 = `http://localhost:1234` + "/" + req.file.path;
    // const productImage = subjectUrl1.split("\\").join("/");
    if (!productId) {
      await ProductDetails.add({
        productName, description, size, discountPrice, price, color, productImage
      });

      res.send({ status: "success", data: "Product added successfully" });
    } else {
      await ProductDetails.doc(productId).update({
        productName, description, size, discountPrice, price, color, productImage
      });
      res.send({ status: "success", data: "Product Update successfully" });

    }
  } catch (error) {
    res.send({ status: "error", data:error });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const Product = await ProductDetails.get();
    const productsArray = Product.docs.map(doc => {
      const data = doc.data();
      const id = doc.id;
      return { id, ...data };
    });

    console.log('All Product Details:', productsArray);
    res.send({ status: "success", data: productsArray });
  } catch (error) {
    console.error('Error storing user details in Firestore:', error);
    res.send({ status: "error", data: error });
  }
};
exports.getProductbyId = async (req, res, next) => {
  const { productId } = req.body; // Assuming productId is provided in the request body

  try {
    if (!productId) {
      throw ("missing parameter");
    }

    const productDetailsSnapshot = await ProductDetails.doc(productId).get();

    if (productDetailsSnapshot.exists) {
      // Document exists, access its data and ID
      const data = productDetailsSnapshot.data();
      const id = productDetailsSnapshot.id;

      console.log('Product Details:', { id, ...data });
      res.send({ status: "success", data: { id, ...data } });
    } else {
      console.log('Product not found');
      res.send({ status: "error", data: "Product not found" });
    }
  } catch (error) {
    console.error('Error getting product details by ID:', error);
    res.send({ status: "error", data: error });
  }


};
exports.deleteProductbyId = async (req, res, next) => {
  const { productId } = req.body;

  try {
    if (!productId) {
      throw "missing parameter";
    }

    const productDetailsRef = await ProductDetails.doc(productId);

    const productDetailsSnapshot = await productDetailsRef.get();

    if (productDetailsSnapshot.exists) {
      await ProductDetails.doc(productId).delete();

      console.log('Product deleted successfully');
      res.send({ status: "success", data: "Product deleted successfully" });
    } else {
      console.log('Product not found');
      res.send({ status: "error", data: "Product not found" });
    }
  } catch (error) {
    console.error('Error deleting product by ID:', error);
    res.send({ status: "error", data: "Error deleting product by ID" });
  }

};
// exports.addToCard = async (req, res, next) => {
//   const { userId, productId } = req.body;
//   try {
//     const newObject = { productId: productId };

//     const documentRef = userCollection.doc(userId);

//     await documentRef.update({
//       addToCard: admin.firestore.FieldValue.arrayUnion(newObject),
//     });

//     console.log('AddtoCard successfully');
//     res.send({ status: "Success", message: "added successfuly" })
//   } catch (error) {
//     console.error('Error in AddtoCard:', error);
//     res.send({ status: "Success", message: "Something went wrong" })

//   }
// };

