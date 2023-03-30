using Eshop.webAPI.Models;
using System.Reflection;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDatabase
    {
        private static List<CategoryModel> categories = new List<CategoryModel>();
        private static List<CommodityModel> commodities= new List<CommodityModel>();
        private static List<ManufacturerModel> manufacturers = new List<ManufacturerModel>();
        private static List<ReviewModel> reviews = new List<ReviewModel>();

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
        public static List<ReviewModel> Reviews
        {
            get { return reviews;}
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
            manufacturers.Add(newManufacturer);
        }
        public static void AddReview(ReviewModel newReview)
        {
            reviews.Add(newReview);
        }
        public static void InitDatabase()
        {
            //CategoryModel instances initialization

            var vrtacky = new CategoryModel() { Id = Guid.NewGuid(), Name = "Vrtačky" };
            var utahovacky = new CategoryModel() { Id = Guid.NewGuid(), Name = "Uťahovačky" };
            var skrutkovace = new CategoryModel() { Id = Guid.NewGuid(), Name = "Skrutkovače" };
            var lopaty = new CategoryModel() { Id = Guid.NewGuid(), Name = "Lopaty" };
            var hrable = new CategoryModel() { Id = Guid.NewGuid(), Name = "Hrable" };
            var vytrhavaceBuriny = new CategoryModel() { Id = Guid.NewGuid(), Name = "Vytrhávače buriny" };
            var silaznePlachty = new CategoryModel() { Id = Guid.NewGuid(), Name = "Silážne plachty" };
            
            //ManufacturerModel instances initialization

            var bosch = new ManufacturerModel() { 
                Id = Guid.NewGuid(), 
                Name = "Bosch",
                Country = "Nemecko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "Spoločnosť Bosch, ktorá bola založená Robertom Boschom v Stuttgarte," +
                              " pôsobí na trhu už od roku 1886, kedy začínala len s telefónnymi systémami a elektrickými zvončekmi." +
                              " V súčasnosti je oblasť pôsobenia veľmi široká a do jej sortimentu patrí najrôznejšie vybavenie" +
                              " pre každodenný život, od ručného a elektrického náradia cez záhradnú techniku, autobatérie," +
                              " autodiely až po kuchynské a domáce spotrebiče."
            };

            var parkside = new ManufacturerModel() { 
                Id = Guid.NewGuid(), 
                Name = "Parkside",
                Country = "Nemecko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "S PARKSIDE si môžeš byť istý: aby si mohol úlohy v dome a v záhrade zvládnuť sám," +
                              " dostaneš najvyššiu kvalitu a výkon za najlepšiu možnú cenu. Môžeš očakávať nespočetné množstvo" +
                              " oblastí použitia, rôzne výkonnostné triedy a naše vlastné produktové systémy – napríklad našu " +
                              "akumulátorovú technológiu. Naša ponuka je taká široká, že v nej nájdeš presne to, čo potrebuješ, " +
                              "či si začiatočník, alebo profesionál. Od bezuhlíkového motora až po inteligentné pripojenie " +
                              "prostredníctvom aplikácie, tešiť sa môžeš aj na stále nové funkcie."
            };

            var ferrida = new ManufacturerModel() { 
                Id = Guid.NewGuid(), 
                Name = "Ferrida",
                Country = "Nemecko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "Značka Ferrida predstavuje to najlepšie náradie pre všetkých domácich majstrov, " +
                              "príležitostných hodinových manželov a záhradkárov.Zodpovedne a s nasadením vám " +
                              "prinášame kvalitné náradie a stroje, ktoré vydržia dlhé roky a pritom výrazne nezasiahnu"+
                              "do rodinného rozpočtu. Zveľaďte svoj byt, dom, chatu alebo záhradu pomocou Ferrida"+
                              "vŕtačiek, brúsok, kotúčových píl, skrutkovačov, kosačiek alebo vertikutátorov. " +
                              "Všetky naše výrobky starostlivo navrhujeme a konštruujeme s myšlienkou, že sú určené pre všetkých, " +
                              "od úplných začiatočníkov až po zdatných domácich majstrov, ktorí vedia, čo a ako.Či už ste kutil alebo kutilka, " +
                              "s náradím Ferrida dotiahnete svoj projekt do konca!"
            };
            var blackmont = new ManufacturerModel() {
                Id = Guid.NewGuid(), 
                Name = "Blackmont",
                Country = "Rakúsko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "Blackmont prináša na trh auto-moto doplnky, ako sú ochranné plachty, strešné boxy, nabíjacie káble, " +
                               "reťaze na kolesá, praktické súpravy náradia, pracovné oblečenie alebo efektívne nabíjačky autobatérií. " +
                               "Pestrý sortiment dopĺňajú aj chladiace boxy a autochladničky, ideálna výbava na cesty. To všetko s vysokým " +
                               "štandardom kvality a s ohľadom na rozumnú cenovú dostupnosť. Blackmont doplnky si zamilujú nielen nadšenci " +
                               "motorových vozidiel, ale aj bežní používatelia."
            };

            var fiskars = new ManufacturerModel() { 
                Id = Guid.NewGuid(),
                Name = "Fiskars",
                Country = "Fínsko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "Fiskars už od svojho založenia absolútne vyniká a dá vyniknúť aj Vám . Fiskars vám dovolí prácu si " +
                              "užívať a nie sa drieť. Fiskars to je : Premyslená funkčnosť každého nástroja pre jednoduchšiu prácu. " +
                              "Dokonalá ergonómia a pohodlie pre pevné uchopenie. Špičkové materiály pre čo najvyššiu kvalitu. " +
                              "Mimoriadna výdrž a trvanlivosť. Nadčasový dizajn"
            };

            var juta = new ManufacturerModel() { 
                Id = Guid.NewGuid(), 
                Name = "JUTA",
                Country = "Česká republika",
                ImageUrl = "TODO/TODO/TODO",
                Description = "JUTA a. s. je významným českým výrobcom širokého sortimentu produktov pre stavebníctvo a poľnohospodárstvo, " +
                              "obalových materiálov a umelého trávniku pre šport a volný čas. S 18 závodmi a ročným obratom " +
                              "7,5 miliárd korún sa riadi k najväčším výrobcom v jednotlivých odvetviach. Viac než 75% produkcie je " +
                              "určená pre vývoz do celého sveta, čím sa JUTA značnou mierou podieľa na celkovom exporte českého priemyslu."
            };
            var makita = new ManufacturerModel() { 
                Id = Guid.NewGuid(),
                Name = "Makita", 
                Country = "Japonsko",
                ImageUrl = "TODO/TODO/TODO",
                Description = "Makita vďačí za svoju reputáciu výrobe náradia špičkovej kvality, ktoré začala vyrábať pred viac " +
                              "ako 100 rok-mi, keď v r. 1915 Masaburo Makita s tromi spolupracovníkmi zakladajú v Nagoya City firmu " +
                              "na výrobu elektromotorov generátorov." 
            };


            //CommodityModel instances initialization


            var vrt1 = new CommodityModel() {
                Id = Guid.NewGuid(),
                Name = "Vŕtacie a sekacie kladivo PBH 800 A1",
                Price = (float?)59.99,
                Weight = (float?)2.5,
                StockQuantity = 12,
                Manufacturer = parkside,  
                Category = vrtacky,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Na výkonné opracovávanie betónu, kameňa, kovu alebo dreva. Pneumatické kladivo s vysokou silou úderu " +
                              "Rýchloupínacie skľučovadlo s upnutím podľa systému SDS plus. Centrálny prepínač pre všetky funkcie: Vŕtanie, " +
                              "príklepové vŕtanie so zapnutou funkciou kladiva, nastavenie polohy sekáča, sekanie so zapnutou funkciou kladiva, " +
                              "nasaditeľné rýchloupínacie skľučovadlo pre vrtáky s okrúhlou stopkou, protišmykové držadlo s mäkkým povrchom, " +
                              "predné držadlo otočné o 360° v praktickom úschovnom kufríku",
                
                  
            };

            var vrt2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Elektrická vrtačka s príklepom Makita HP1630K",
                Price = (float?)85.99,
                Weight = (float?)2.1,
                StockQuantity = 4,
                Manufacturer = makita,
                Category = vrtacky,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Renomovaný japonský výrobca elektrického náradi Maktia prichádza na trh s veľmi šikovným modelom elktrickej " +
                              "vrtačky s príklepom HP1630K, ktorá sa stane neoddeliteľnou súčasťou vašej dieľne. Tento model sa môže pochváliť " +
                              "predovšetkým vysoko kvalitným spracovaním zaručujúcim spoľahlivý chod, ďalej solidným výkonom a praktickou sadou " +
                              "príslušenstva, v ktorej nájdete všetko, čo budete k práci potrebovať. Jedná sa o model ku klasickému šrébovaniu " +
                              "tak ku 3tandardnému vŕtaniu s príklepom. Poradí si s drevom, oceľou alebo beténom."
            };

            var skrut1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "FERRIDA sada skrutkovačov 6 ks",
                Price = (float?)8.39,
                Weight = (float?)0.3,
                StockQuantity = 8,
                Manufacturer = ferrida,
                Category = skrutkovace,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Sada skrutkovačov – 3 veľkosti plochých (3×75, 5.5×100, 6.5×100mm) a 3 veľkosti krížových (0×75, 1×75, 2×100mm) skrutkovačov, " +
                              "magnetické špičky, ergonomická rukoväť, chróm-vanádiová oceľ"
            };

            var skrut2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Makita E-13502 sada skrutkovačov 6 ks",
                Price = (float?)19.90,
                Weight = (float?)0.256,
                StockQuantity = 16,
                Manufacturer = makita,
                Category = skrutkovace,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Sada skrutkovačov – s ergonomickou protišmykovou rukoväťou, obsahuje PZ1 × 80 mm, PZ2 × 100 mm, SL4,0 × 100 mm, " +
                              "SL5,5 × 100 mm, SL6,5 × 125 mm, SL8,0 × 150 mm - 3,32 €/ks"
            };

            var skrut3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "MAKITA E-13530 sada skrutkovačov T10-T30, 5 ks",
                Price = (float?)18.90,
                Weight = (float?)0.318,
                StockQuantity = 7,
                Manufacturer = makita,
                Category = skrutkovace,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Sada skrutkovačov – s ergonomickou protišmykovou rukoväťou, T10×100mm, T15×100mm, T20×100mm, T25×100mm, T30×100mm - 3,78 €/ks"
                
            };

            var utah1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Bosch GDR 18V-200 C (2× 4,0Ah ProCore, Lboxx 136)",
                Price = (float?)426.90,
                Weight = (float?)1.1,
                StockQuantity = 2,
                Manufacturer = bosch ,
                Category = utahovacky,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Rázový uťahovák aku, typ prichytenia: vnútorný šesťhran 1/4, 3400ot./min, krútiaci moment 200Nm"
            };

            var utah2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Makita TW140DSAEX",
                Price = (float?)165.90,
                Weight = (float?)1,
                StockQuantity = 6,
                Manufacturer = makita,
                Category = utahovacky,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Rázový uťahovák aku, typ prichytenia: vonkajší štvorhran 3/8\", 2600ot./min, krútiaci moment 135Nm"
            };

            var utah3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "PARKSIDE® Aku rázový uťahovák na kolesá auta PASSK 20-Li B2 20 V",
                Price = (float?)79.99,
                Weight = (float?)1.4,
                StockQuantity = 9,
                Manufacturer = parkside,
                Category = utahovacky ,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Výkonný rázový uťahovák na montáž kolies osobných automobilov, plynulo nastaviteľný počet otáčok/úderov, " +
                              "5 predvoliteľných stupňov krútiaceho momentu: 100/150/200/300/400 Nm, protišmykové držadlo s mäkkým povrchom, " +
                              "praktická spona na opasok, vrátane otvárača na fľaše, zabudované LED pracovné svetlo"
            };

            var lop1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars Lopata Solid",
                Price = (float?)18.90,
                Weight = (float?)0.756,
                StockQuantity = 21,
                Manufacturer = fiskars,
                Category = lopaty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Lopata rovný tvar čepele."
            };

            var lop2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars Lopata Ergonomics",
                Price = (float?)32.90,
                Weight = (float?)0.678,
                StockQuantity = 5,
                Manufacturer = fiskars,
                Category = lopaty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Lopata rovný tvar čepele, ergonomický úchyt."
            };

            var lop3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars Lopata Xact",
                Price = (float?)46.90,
                Weight = (float?)0.551,
                StockQuantity = 8,
                Manufacturer = fiskars,
                Category = lopaty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Lopata s čepeľou so šírkou 24 cm, rovný tvar čepele."
            };

            var hrab1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars Hrable na lístie Solid L",
                Price = (float?)17.90,
                Weight = (float?)0.268,
                StockQuantity = 11,
                Manufacturer = fiskars,
                Category = hrable,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Hrable na lístie, so záberom 52 cm, materiál pracovnej časti: plast."
            };

            var hrab2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars QuikFit Hrable na lístie L",
                Price = (float?)15.90,
                Weight = (float?)0.178,
                StockQuantity = 3 ,
                Manufacturer = fiskars,
                Category = hrable,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Hrable na lístie, so záberom 50 cm, materiál pracovnej časti: plast + potreba dokúpiť Náasadu Fiskars Quickfit."
            };

            var hrab3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "PARKSIDE® Teleskopické hrable",
                Price = (float?)11.90,
                Weight = (float?)0.313,
                StockQuantity = 23,
                Manufacturer = parkside,
                Category = hrable,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Extra široké hrable s 24 stabilnými hrotmi (12 na každej strane) na rýchle a dôkladné hrabanie – tiež na veľkých plochách."
            };

            var vytrh1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "FISKARS Vytrhávač buriny SmartFit",
                Price = (float?)59.90,
                Weight = (float?)0.955,
                StockQuantity = 2,
                Manufacturer = fiskars,
                Category = vytrhavaceBuriny,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Vytrhávač buriny – dĺžka 119 cm, teleskopický, hmotnosť 1,25 kg, čierna farba."
            };

            var vytrh2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "FERRIDA WB 6020",
                Price = (float?)28.62,
                Weight = (float?)0.568,
                StockQuantity = 6,
                Manufacturer = ferrida,
                Category = vytrhavaceBuriny,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Odstraňovač buriny elektrický, 2000W, teleskopická rukoväť, prietok vzduchu 500 l / min, 2 teplotné stupne 50 ° C / 600 ° C, " +
                              "vymeniteľné nástavce, možno použiť aj ako teplovzdušnú pištoľ, podpaľovač grilu, rozmrazovač"
            };

            var vytrh3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "Fiskars Vytrhávač buriny QuikFit",
                Price = (float?)10.90,
                Weight = (float?)0.156,
                StockQuantity = 6,
                Manufacturer = fiskars,
                Category = vytrhavaceBuriny,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Vytrhávač buriny – vhodný na odstránenie burín, materiál bórová oceľ, mechanizmus zámku QuikFit na pripojenie na univerzálny " +
                              "pracovný adaptér alebo násadu"
            };

            var silaz1 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "JUTA Silážna plachta 10x20 m, 150u, čierna",
                Price = (float?)89.65,
                Weight = (float?)2.9,
                StockQuantity = 5,
                Manufacturer = juta,
                Category = silaznePlachty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Silážne plachty sú vyrábané z hygienicky nezávadného koextrudovaného polyetylénu."
            };

            var silaz2 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "JUTA Silážna plachta 10x10 m, 150u, čierna",
                Price = (float?)45.32,
                Weight = (float?)1.5,
                StockQuantity = 12,
                Manufacturer = juta,
                Category = silaznePlachty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Silážne plachty sú vyrábané z hygienicky nezávadného koextrudovaného polyetylénu."
            };

            var silaz3 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "JUTA Silážna plachta 10x25 m, 150u, čierna/biela",
                Price = (float?)129.65,
                Weight = (float?)8.5,
                StockQuantity = 5,
                Manufacturer = juta,
                Category = silaznePlachty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Silážne plachty sú vyrábané z hygienicky nezávadného koextrudovaného polyetylénu. Čierna/Biela."
            };

            var silaz4 = new CommodityModel()
            {
                Id = Guid.NewGuid(),
                Name = "JUTA Silážna plachta 10x5 m, 150u, čierna/biela",
                Price = (float?)37.25,
                Weight = (float?)1.4,
                StockQuantity = 32,
                Manufacturer = juta,
                Category = silaznePlachty,
                ImageUrl = "TODO/TODO/TODO",
                Description = "Silážne plachty sú vyrábané z hygienicky nezávadného koextrudovaného polyetylénu.  Čierna/Biela."
            };

            var reviewVrt1 = new ReviewModel()
            {
                Stars = 5,
                Description = "Nepoznám lepšiu vrtačku, odporúčam",
                Title = "Doporučuje produkt"
            };

            var reviewVrt2 = new ReviewModel()
            {
                Stars = 4,
                Description = "Negativem může být trochu vyšší cenovka, avšak za investované peníze získáte přístroj s dvourychlostní převodovkou a dobrými vrtacími parametry",
                Title = "Doporučuje produkt"
            };

            var reviewUtah1 = new ReviewModel()
            {
                Stars = 3,
                Description = "Utahovačku lze použít kdekoliv na stavbě a není třeba vozit kompresor,ale rychle se vybijí. ",
                Title = "Dost"
            };

            var reviewUtah2 = new ReviewModel()
            {
                Stars = 2,
                Description = "PO 10 DNECH PŘESTAL FUNGOVAT.",
                Title = "Great value!"
            };

            var reviewUtah3 = new ReviewModel()
            {
                Stars = 1,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewHrab1 = new ReviewModel()
            {
                Stars = 5,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewHrab2 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewHrab3 = new ReviewModel()
            {
                Stars = 3,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewLop1 = new ReviewModel()
            {
                Stars = 2,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewLop2 = new ReviewModel()
            {
                Stars = 1,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewLop3 = new ReviewModel()
            {
                Stars = 5,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewVytrh1 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewVytrh2 = new ReviewModel()
            {
                Stars = 3,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewVytrh3 = new ReviewModel()
            {
                Stars = 2,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewSilaz1 = new ReviewModel()
            {
                Stars = 1,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewSilaz2 = new ReviewModel()
            {
                Stars = 5,
                Description = "Tá",
                Title = "Great value!"
            };
            var reviewSilaz3 = new ReviewModel()
            {
                Stars = 3,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewSilaz4 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewSkrut1 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewSkrut2 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };

            var reviewSkrut3 = new ReviewModel()
            {
                Stars = 4,
                Description = "Tá",
                Title = "Great value!"
            };






            //predloha na commoditymodel

            //var silaz1 = new CommodityModel()
            //{
            //    Id = Guid.NewGuid(),
            //    Name = "",
            //    Price = (float?)18.90,
            //    Weight = (float?)0.318,
            //    StockQuantity = ,
            //    Manufacturer = ,
            //    Category = ,
            //    ImageUrl = "TODO/TODO/TODO",
            //    Description = ""
            //};

            //com2.addReview();

            categories.Add(vrtacky);
            categories.Add(utahovacky);
            categories.Add(hrable);
            categories.Add(lopaty);
            categories.Add(vytrhavaceBuriny);
            categories.Add(skrutkovace);
            categories.Add(silaznePlachty);

            manufacturers.Add(makita);
            manufacturers.Add(bosch);
            manufacturers.Add(parkside);
            manufacturers.Add(ferrida);
            manufacturers.Add(fiskars);
            manufacturers.Add(juta);
            manufacturers.Add(blackmont);

            commodities.Add(vrt1);
            commodities.Add(vrt2);
            commodities.Add(utah1);
            commodities.Add(utah2);
            commodities.Add(utah3);
            commodities.Add(hrab1);
            commodities.Add(hrab2);
            commodities.Add(hrab3);
            commodities.Add(lop1);
            commodities.Add(lop2);
            commodities.Add(lop3);
            commodities.Add(vytrh1);
            commodities.Add(vytrh2);
            commodities.Add(vytrh3);
            commodities.Add(silaz1);
            commodities.Add(silaz2);
            commodities.Add(silaz3);
            commodities.Add(silaz4);
            commodities.Add(skrut1);
            commodities.Add(skrut2);
            commodities.Add(skrut3);
            



            vrt1.addReview(reviewVrt1);
            vrt2.addReview(reviewVrt2);
            utah1.addReview(reviewUtah1);
            utah2.addReview(reviewUtah2);
            utah3.addReview(reviewUtah3);
            hrab1.addReview(reviewHrab1);
            hrab2.addReview(reviewHrab2);
            hrab3.addReview(reviewHrab3);
            lop1.addReview(reviewLop1);
            lop2.addReview(reviewLop2);
            lop3.addReview(reviewLop3);
            vytrh1.addReview(reviewVytrh1);
            vytrh2.addReview(reviewVytrh2);
            vytrh3.addReview(reviewVytrh3);
            silaz1.addReview(reviewSilaz1);
            silaz2.addReview(reviewSilaz2);
            silaz3.addReview(reviewSilaz3);
            silaz4.addReview(reviewSilaz4);
            skrut1.addReview(reviewSkrut1);
            skrut2.addReview(reviewSkrut2);
            skrut3.addReview(reviewSkrut3);




            fiskars.addCommodity(lop1);
            fiskars.addCommodity(lop2);
            fiskars.addCommodity(lop3);





        }
    }
}
