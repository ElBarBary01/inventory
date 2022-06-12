const express = require('express');
const router = express.Router();

// Load Product model
const Product = require('../../models/products');

// @route GET api/products/test
// @description tests products route
// @access Public
router.get('/test', (req, res) => res.send('product route testing!'));

// @route GET api/products
// @description Get all products
// @access Public
router.get('/', (req, res) => {
  Product.find()
    .then(products => res.json(products))
    .catch(err => res.status(404).json({ error: err.message }));
});

// @route GET api/products/:id
// @description Get single product by id
// @access Public
router.get('/:id', (req, res) => {
  product_id=req.params.id;
  Product.findOne({id: product_id})
    .then(product => res.json(product))
    .catch(err => res.status(404).json({ error: 'No Products found' }));
});

// @route GET api/products
// @description add/save product
// @access Public
router.post('/', (req, res) => {
  Product.create(req.body)
    .then(product => res.json({ msg: 'Product added successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

// @route GET api/products/:id
// @description Update product
// @access Public
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body)
    .then(product => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route GET api/products/:id
// @description Delete product by id
// @access Public
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, req.body)
    .then(product => res.json({ msg: 'Product entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a product' }));
});
router.post('/products', (req, res) => {
  Product.insertMany(products.json)
    .then(product => res.json({ msg: 'Product added successfully' }))
    .catch(err => res.status(400).json({ error: err.message }));
});

router.get("/search/:search", async (req,res) => {
  try {
      const search = req.params.search;
      const products = await Product.find({"name": {$regex: search, $options: "i"}});
      res.status(200).json({products});
  } catch (error) {
      res.status(404).json({message: error.message});
  }
})

router.patch("/:id", async (req,res) =>{

  try{
    product_id=req.params.id;
    const product =await Product.findOne({id: product_id})
    if(product.stock<=0){
      return res.status(400).json({message: "out of stock"});
    }
    const newstock = product.stock-1

     const newProduct = await Product.findOneAndUpdate({id: product_id}, {stock : (newstock)});
            res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({message: error.message});
}

})

module.exports = router;