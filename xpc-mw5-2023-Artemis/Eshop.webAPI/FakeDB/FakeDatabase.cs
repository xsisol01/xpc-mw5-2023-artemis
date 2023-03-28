using Eshop.webAPI.Models;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Threading.Tasks;

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


            var com1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Category = (from c in categories
                            where c.Name == "Vrtačky"
                            select c).FirstOrDefault(),
                Name = "Vŕtacie a sekacie kladivo PBH 800 A1",
                Description = "Na výkonné opracovávanie betónu, kameňa, kovu alebo dreva\r\n" +
                              "Pneumatické kladivo s vysokou silou úderu\r\n" +
                              "Rýchloupínacie skľučovadlo s upnutím podľa systému SDS plus\r\n" +
                              "Centrálny prepínač pre všetky funkcie: Vŕtanie\r\n" +
                              "Príklepové vŕtanie so zapnutou funkciou kladiva\r\n" +
                              "Nastavenie polohy sekáča\r\n" +
                              "Sekanie so zapnutou funkciou kladiva\r\n" +
                              "Nasaditeľné rýchloupínacie skľučovadlo pre vrtáky s okrúhlou stopkou\r\n" +
                              "Protišmykové držadlo s mäkkým povrchom\r\n" +
                              "Predné držadlo otočné o 360°\r\nV praktickom úschovnom kufríku\r\n",
                ImageUrl = "TODO/TODO/TODO",
                Price = (float?)59.99,
                StockQuantity = 12,
                Weight = (float?)2.5,
                Manufacturer = null     //todo
                
            };

            //com1.addReview();

            var com2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Category = (from c in categories
                            where c.Name == "Vrtačky"
                            select c).FirstOrDefault(),
                Name = "Elektrická vrtačka s priklepom Makita HP1630K",
                Description = "Renomovaný japonský výrobce elektrického nářadí Makita přichází na trh s velmi šikovným modelem elektrické vrtačky s příklepem HP1630K," +
                              "která se stane nedílnou součástí vaší díly.Tento model se může pochlubit především vysoce kvalitním zpracováním zaručujícím spolehlivý chod," +
                              "dále solidním výkonem a praktickou sadou příslušenství,ve které najdete vše, co budete k práci potřebovat.Jedná se o model vhodný jak ke klasickému šroubování," +
                               "tak standardnímu vrtání s příklepem.Poradí si kromě dřeva také s ocelí nebo betonem.",
                ImageUrl = "TODO/TODO/TODO",
                Price = (float?)85.99,
                StockQuantity = 3,
                Weight = (float?)3.8,
                Manufacturer = null //todo

            };

            var com3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Category = (from c in categories
                            where c.Name == "Šrobováky"
                            select c).FirstOrDefault(),
                Name = "Sada nářadí Makita E-10528 6 ks",
                Description = "Mějte všechno nářadí vždy u sebe a pracujte tak naplno po celý den.Sada nářadí Makita obsahuje 6 kusů šroubováků o rozměrech SL4.0x100," +
                              "SL5.5x100,PH1x100,PH2x100,PZ1x80," +
                              "PZ2x100.Rukojeti jsou vyrobeny z velmi kvalitního materiálu odolného proti oleji," +
                              "nehrozí jim tedy nebezpečí jakéhokoliv poškození a navíc svým ergonomickým tvarem vám zajistí plně komfortní práci.Rukojeť také disponuje speciálním značením," +
                              "které velmi usnadňuje identifikaci nástroje.Samotný šroubovák je vyroben z kvalitní Cr - V oceli," +
                              "která zajišťuje dlouhou životnost,a pro pohodlnější skladování je ještě špička šroubováku magneticky upravena.",
                ImageUrl = "TODO/TODO/TODO",
                Price = (float?)85.99,
                StockQuantity = 3,
                Weight = (float?)3.8,
                Manufacturer = null //todo

            };



            //com2.addReview();

            commodities.Add(com1);
            commodities.Add(com2);
            commodities.Add(com3);





        }
    }
}
