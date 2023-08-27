const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
    // find all categories
    // be sure to include its associated Products

    Category.findAll({
        include: [{ model: Product }],
    })
        .then((categoryData) => {
            res.json(categoryData)
        });
});

router.get('/:id', async (req, res) => {
    // find one category by its `id` value
    // be sure to include its associated Products
    Category.findOne(
        {
            include: [{ model: Product }],
            where: {
                id: req.params.id
            },
        }
    ).then((categoryData) => {
        res.json(categoryData);
    })
});

router.post('/', (req, res) => {
    // create a new category
    Category.create({
        id: req.body.id,
        category_name: req.body.category_name,
    })
        .then((newCategory) => {
            // Send the newly created row as a JSON object
            res.json(newCategory);
        })
        .catch((err) => {
            res.json(err);
        });
});

router.put('/:id', (req, res) => {
    // update a category by its `id` value
    Category.update(
        {
            id: req.body.id,
            category_name: req.body.category_name,
        },
        {
            where: {
                id: req.params.id,
            },
        }
    )
        .then((updatedCategory) => {
            res.json(updatedCategory);
        })
        .catch((err) => res.json(err));
});

router.delete('/:id', (req, res) => {
    // delete a category by its `id` value
    Category.destroy({
        where: {
            id: req.params.id,
        },
    })
        .then((categoryProduct) => {
            res.json(categoryProduct);
        })
        .catch((err) => res.json(err));
});

module.exports = router;
