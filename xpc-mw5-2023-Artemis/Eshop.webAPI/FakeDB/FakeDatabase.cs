using Bogus;
using Eshop.webAPI.Models;

namespace Eshop.webAPI.FakeDB
{
    public sealed class FakeDatabase
    {
        static List<CategoryModel> _categories = new List<CategoryModel>();
        static List<CommodityModel> _commodities = new List<CommodityModel>();
        static List<ManufacturerModel> _manufacturers = new List<ManufacturerModel>();
        static List<ReviewModel> _reviews = new List<ReviewModel>();

        public static List<CategoryModel> Categories { get { return _categories; } }
        public static List<ReviewModel> Reviews { get { return _reviews; } }
        public static List<ManufacturerModel> Manufacturers { get { return _manufacturers; } }
        public static List<CommodityModel> Commodities { get { return _commodities; } }

        static FakeDatabase()
        {
            var categorySample = new Faker<CategoryModel>()
                .CustomInstantiator(f => new CategoryModel())
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Name.JobTitle());
            _categories = categorySample.Generate(10);

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

            _manufacturers = manufacturerSample.Generate(8);

            var commoditySample = new Faker<CommodityModel>()
                .RuleFor(c => c.Id, f => f.Random.Guid())
                .RuleFor(c => c.Name, f => f.Commerce.ProductName())
                .RuleFor(c => c.ImageUrl, f => f.Image.PicsumUrl())
                .RuleFor(c => c.Description, f => f.Commerce.ProductDescription())
                .RuleFor(c => c.Price, f => f.Random.Float(0, 1000))
                .RuleFor(c => c.Weight, f => f.Random.Float(0, 100))
                .RuleFor(c => c.StockQuantity, f => f.Random.Int(0, 100))
                .RuleFor(c => c.Category, f => f.PickRandom(_categories))
                .RuleFor(c => c.Manufacturer, f => f.PickRandom(_manufacturers))
                .FinishWith((f, c) =>
                {
                    int numReviews = f.Random.Int(0, 10);
                    for (int i = 0; i < numReviews; i++)
                    {
                        var rev = reviewSample.Generate();
                        c.addReview(rev);
                        _reviews.Add(rev);
                    }
                });
            _commodities = commoditySample.Generate(40);
            foreach (var c in _commodities)
            {
                c.Manufacturer.addCommodity(c);
            }


        }
    }
}
