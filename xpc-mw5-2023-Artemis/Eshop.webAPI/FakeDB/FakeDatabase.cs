using Eshop.webAPI.Models;
using System.Reflection.Metadata.Ecma335;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDatabase
    {
        private static List<Category> categories = new List<Category>();

        public static List<Category> Categories 
        {
            get { return categories;} 
        }

        public static void AddCategory(Category newCategory)
        {
            categories.Add(newCategory);
        }

        public static void InitDatabase()
        {

            categories.Add(new Category() { Id = Guid.NewGuid(), Name = "Vrtačky" });
            categories.Add(new Category() { Id = Guid.NewGuid(), Name = "Šrobováky" });
            categories.Add(new Category() { Id = Guid.NewGuid(), Name = "Lopaty" });
            categories.Add(new Category() { Id = Guid.NewGuid(), Name = "Hrable" });
            
        }
    }
}
