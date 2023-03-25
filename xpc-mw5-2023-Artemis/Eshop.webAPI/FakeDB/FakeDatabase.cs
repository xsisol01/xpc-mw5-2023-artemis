using Eshop.webAPI.Models;
using System.Reflection.Metadata.Ecma335;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDatabase
    {
        private static List<CategoryModel> categories = new List<CategoryModel>();

        public static List<CategoryModel> Categories 
        {
            get { return categories;} 
        }

        public static void AddCategory(CategoryModel newCategory)
        {
            categories.Add(newCategory);
        }

        public static void InitDatabase()
        {

            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Vrtačky" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Šrobováky" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Lopaty" });
            categories.Add(new CategoryModel() { Id = Guid.NewGuid(), Name = "Hrable" });
            
        }
    }
}
