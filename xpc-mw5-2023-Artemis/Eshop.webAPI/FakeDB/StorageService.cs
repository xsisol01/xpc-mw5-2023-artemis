using Eshop.webAPI.Models;
using System.Linq;

namespace Eshop.webAPI.FakeDB
{
    public static class StorageService<T>
    {
        private static List<T> _storage = new List<T>();
        public static List<T> Storage{ get { return _storage; } }
        public static void Add(T storage)
        {
            _storage.Add(storage);
        }

        public static void Update<T>(List<T> storage,T item) where T : ManufacturerModel
        {
            //var obj = storage.Any((s => s.Name == item.Name)).FirstOrdefault;
            
        }

        public static void initStorageService()
        {
            var man1 = new ManufacturerModel()
            {
                Name = "jozef"
            };
            var com1 = new CommodityModel()
            {
                Name = "bakula"
            };


            StorageService<ManufacturerModel>.Add(man1);
            StorageService<CommodityModel>.Add(com1);


        }

    }

    
    
}
