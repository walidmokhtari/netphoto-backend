const Categorie = require('../../models/categorie.model');

module.exports = {
    Query: {
        getCategories: async () => {
            return await Categorie.find();
        },
        async getCategorie(parent, args, context) {
            return await Categorie.findById(args.id);
        }
    },
    Mutation: {
        createCategorie(parent, args) {
            const newCategorie = new Categorie(
                {
                    title: args.title
                }
            )
            return newCategorie.save();
        },
        updateCategorie(parent, {id, title}) {
            return Categorie.findByIdAndUpdate(id, { title: title});
        }
    }
}