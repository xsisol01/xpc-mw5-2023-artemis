using Bogus;
using Eshop.webAPI.Models;
using System.Collections.Generic;

namespace Eshop.webAPI.FakeDB
{
    public sealed class FakeDatabase
    {
        static List<CategoryModel> categories = new List<CategoryModel>();
        static List<CommodityModel> commodities = new List<CommodityModel>();
        static List<ManufacturerModel> manufacturers = new List<ManufacturerModel>();
        static List<ReviewModel> reviews = new List<ReviewModel>();

        public static List<CategoryModel> Categories { get { return categories; } }
        public static List<ReviewModel> Reviews { get { return reviews; } }
        public static List<ManufacturerModel> Manufacturers { get { return manufacturers; } }
        public static List<CommodityModel> Commodities { get { return commodities; } }

        static FakeDatabase()
        {
            var categorySample = new Faker<CategoryModel>()
                .CustomInstantiator(f => new CategoryModel())
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Name.JobTitle());
            categories = categorySample.Generate(10);

            var reviewSample = new Faker<ReviewModel>()
                .RuleFor(r => r.Id, f => f.Random.Guid())
                .RuleFor(r => r.Title, f => f.Lorem.Sentence())
                .RuleFor(r => r.Description, f => f.Lorem.Paragraph())
                .RuleFor(r => r.Stars, f => f.Random.Int(1, 5));

            var manufacturerSample = new Faker<ManufacturerModel>()
                .RuleFor(m => m.Id, f => f.Random.Guid())
                .RuleFor(m => m.Name, f => f.Company.CompanyName())
                .RuleFor(m => m.ImageUrl, f => f.Image.PicsumUrl())
                .RuleFor(m => m.Description, f => f.Lorem.Sentences(2))
                .RuleFor(m => m.Country, f => f.Address.Country());
            //.FinishWith((f, m) =>
            //{
            //    // Add some commodities to the manufacturer
            //    int numCommodities = f.Random.Int(0, 10);
            //    for (int i = 0; i < numCommodities; i++)
            //    {
            //        var commodity = commodities.Generate();
            //        commodity.Manufacturer = m;
            //        m.addCommodity(commodity);
            //    }
            //});
            manufacturers = manufacturerSample.Generate(8);

            var commoditySample = new Faker<CommodityModel>()
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Commerce.ProductName())
                .RuleFor(c => c.ImageUrl, f => f.Image.PicsumUrl())
                .RuleFor(c => c.Description, f => f.Commerce.ProductDescription())
                .RuleFor(c => c.Price, f => f.Random.Float(0, 1000))
                .RuleFor(c => c.Weight, f => f.Random.Float(0, 100))
                .RuleFor(c => c.StockQuantity, f => f.Random.Int(0, 100))
                .RuleFor(c => c.Category, f => f.PickRandom(categories))
                .RuleFor(c => c.Manufacturer, f => f.PickRandom(manufacturers))
                .FinishWith((f, c) =>
                {
                    // Add some reviews to the commodity
                    int numReviews = f.Random.Int(0, 10);
                    for (int i = 0; i < numReviews; i++)
                    {
                        var rev = reviewSample.Generate();
                        c.addReview(rev);
                        reviews.Add(rev);
                    }
                });
            commodities = commoditySample.Generate(40);
            foreach(var c in commodities){
                c.Manufacturer.addCommodity(c);
            }
            
            
        }

        //public static CategoryModel GenerateCategory()
        //{
        //    return categories.Generate();
        //}

        //public static CommodityModel GenerateCommodity()
        //{
        //    return commodities.Generate();
        //}

        //public static ManufacturerModel GenerateManufacturer()
        //{
        //    return manufacturers.Generate();
        //}
        //public static ReviewModel GenerateReview()
        //{
        //    return reviews.Generate();
        //}
    }
}
