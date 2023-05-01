using Bogus;
using Eshop.webAPI.Models;
using System.Collections.Generic;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDatabase
    {
        static Faker<CategoryModel> categories;
        static Faker<CommodityModel> commodities;
        static Faker<ManufacturerModel> manufacturers;
        static Faker<ReviewModel> reviews;
        static Faker<CategoryModel> Categories { get; set; }

        static FakeDatabase()
        {
            Categories = new Faker<CategoryModel>()
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Name.JobTitle());

            commodities = new Faker<CommodityModel>()
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Commerce.ProductName())
                .RuleFor(c => c.ImageUrl, f => f.Image.PicsumUrl())
                .RuleFor(c => c.Description, f => f.Commerce.ProductDescription())
                .RuleFor(c => c.Price, f => f.Random.Float(0, 1000))
                .RuleFor(c => c.Weight, f => f.Random.Float(0, 100))
                .RuleFor(c => c.StockQuantity, f => f.Random.Int(0, 100))
                .RuleFor(c => c.Category, f => categories.Generate())
                .RuleFor(c => c.Manufacturer, f => manufacturers.Generate())
                .FinishWith((f, c) =>
                {
                    // Add some reviews to the commodity
                    int numReviews = f.Random.Int(0, 10);
                    for (int i = 0; i < numReviews; i++)
                    {
                        c.addReview(reviews.Generate());
                    }
                });

            manufacturers = new Faker<ManufacturerModel>()
                .RuleFor(m => m.Id, f => f.Random.Guid())
                .RuleFor(m => m.Name, f => f.Company.CompanyName())
                .RuleFor(m => m.ImageUrl, f => f.Image.PicsumUrl())
                .RuleFor(m => m.Description, f => f.Lorem.Sentences(2))
                .RuleFor(m => m.Country, f => f.Address.Country())
                .FinishWith((f, m) =>
                {
                    // Add some commodities to the manufacturer
                    int numCommodities = f.Random.Int(0, 10);
                    for (int i = 0; i < numCommodities; i++)
                    {
                        var commodity = commodities.Generate();
                        commodity.Manufacturer = m;
                        m.addCommodity(commodity);
                    }
                });
            reviews = new Faker<ReviewModel>()
                 .RuleFor(r => r.Id, f => f.Random.Guid())
                .RuleFor(r => r.Title, f => f.Lorem.Sentence())
                .RuleFor(r => r.Description, f => f.Lorem.Paragraph())
                .RuleFor(r => r.Stars, f => f.Random.Int(1, 5));
        }

        public static CategoryModel GenerateCategory()
        {
            return categories.Generate();
        }

        public static CommodityModel GenerateCommodity()
        {
            return commodities.Generate();
        }

        public static ManufacturerModel GenerateManufacturer()
        {
            return manufacturers.Generate();
        }
        public static ReviewModel GenerateReview()
        {
            return reviews.Generate();
        }
    }
}
