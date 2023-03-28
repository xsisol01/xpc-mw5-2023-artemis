using Eshop.webAPI.Models;
using System.Reflection.Metadata.Ecma335;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDatabase
    {
        private static List<CategoryModel> categories = new List<CategoryModel>();
        private static List<CommodityModel> commodities= new List<CommodityModel>();
        private static List<ManufacturerModel> manufacturers = new List<ManufacturerModel>();

        public static List<CategoryModel> Categories 
        {
            get { return categories; } 
        }

        public static List<CommodityModel> Commodities 
        {
            get { return commodities; }
        }
        public static List<ManufacturerModel> Manufacturers
        {
            get { return manufacturers; }
        }

        public static void AddCategory(CategoryModel newCategory)
        {
            categories.Add(newCategory);
        }

        public static void AddCommodity(CommodityModel newCommodity)
        {
            commodities.Add(newCommodity);
        }
        public static void AddManufacturer(ManufacturerModel newManufacturer)
        {
            categories.Add(newManufacturer);
        }

        public static void InitDatabase()
        {

            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Vrtačky" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Šrobováky" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Lopaty" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Hrable" });
            manufacturers.Add(new ManufacturerModel() { Id = Guid.NewGuid(), Name = "Bosch" });
            manufacturers.Add(new ManufacturerModel() { Id = Guid.NewGuid(), Name = "Parkside" });
            manufacturers.Add(new ManufacturerModel() { Id = Guid.NewGuid(), Name = "Ferrida" });
            manufacturers.Add(new ManufacturerModel() { Id = Guid.NewGuid(), Name = "Blackmont" });

            //commodities.Add(new CommodityModel() {
            //    Id = Guid.NewGuid(),
            //    Category = (from c in categories
            //                where c.Name == "Vrtačky"
            //                select c).FirstOrDefault(),
            //    Name = "Vŕtacie a sekacie kladivo PBH 800 A1",
            //    Description = "Na výkonné opracovávanie betónu, kameňa, kovu alebo dreva\r\n" +
            //                  "Pneumatické kladivo s vysokou silou úderu\r\n" +
            //                  "Rýchloupínacie skľučovadlo s upnutím podľa systému SDS plus\r\n" +
            //                  "Centrálny prepínač pre všetky funkcie: Vŕtanie\r\n" +
            //                  "Príklepové vŕtanie so zapnutou funkciou kladiva\r\n" +
            //                  "Nastavenie polohy sekáča\r\n" +
            //                  "Sekanie so zapnutou funkciou kladiva\r\n" +
            //                  "Nasaditeľné rýchloupínacie skľučovadlo pre vrtáky s okrúhlou stopkou\r\n" +
            //                  "Protišmykové držadlo s mäkkým povrchom\r\n" +
            //                  "Predné držadlo otočné o 360°\r\nV praktickom úschovnom kufríku\r\n",
            //    ImageUrl = "TODO/TODO/TODO",
            //    Price = (float?)59.99,
            //    StockQuantity= 12,
            //    Weight = (float?)2.5,
            //    Review = Add(new ReviewModel() { })

            //})


        }
    }
}
