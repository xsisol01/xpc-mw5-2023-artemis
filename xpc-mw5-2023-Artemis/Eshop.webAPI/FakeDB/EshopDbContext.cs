using Eshop.webAPI.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Linq;


namespace Eshop.webAPI.FakeDB
{
    public class FakeDb
    {
        private List<Product> Products;
        private List<Rating> Ratings;
        private List<Producer> Producers;
        private List<Category> Categories;

        public FakeDb()
        {
            Categories = new List<Category>
        {
            new Category
            {
                
                Name = "Hammer"
            }
        };

            Ratings = new List<Rating>
        {
            new Rating
            {
                Id = 0,
                Stars = 1,
                Text = "I really like them"
            }
        };

            Producers = new List<Producer>
        {
            new Producer
            {
                Id = 0,
                Country = "Czechia",
                Description = "Czech Sneakers Producer",
                ImageUrl = 3,
                Name = "SneakersCZ"
            }
        };


            Products = new List<Product>
        {
            new Product
            {
                Id = 0,
                Description = "Nice Sneakers",
                Producer = Producers[0],
                
                Name = "Nike Sneakers",
               
                StockQuantity = 5,
                Price = 1200,
                Weight = 200
            }
        };
        }

        public Product GetProductById(int id)
        {
            var product = Products.FirstOrDefault(product => product.Id == id);
            return product;
        }

        public List<Product> GetAllProducts()
        {
            return Products;
        }

        public void AddProduct(Product product)
        {
            Products.Add(product);
        }

        public void DeleteProduct(int id)
        {
            Products.Remove(GetProductById(id));
        }

        public int GetProductId()
        {
            int id = Products.Last().Id + 1;
            return id;
        }

        public Category GetCategoryById(int id)
        {
            var category = Categories.FirstOrDefault(category => category.Id == id);
            return category;
        }

        public List<Category> GetAllCategories()
        {
            return Categories;
        }

        public void AddCategory(Category category)
        {
            Categories.Add(category);
        }

        public Rating GetRatingById(int id)
        {
            var rating = Ratings.FirstOrDefault(rating => rating.Id == id);
            return rating;
        }

        public List<Rating> GetAllRatings()
        {
            return Ratings;
        }

        public void AddRating(Rating rating)
        {
            Ratings.Add(rating);
        }

        public Producer GetProducerById(int id)
        {
            var producer = Producers.FirstOrDefault(producer => producer.Id == id);
            return producer;
        }

        public List<Producer> GetAllProducers()
        {
            return Producers;
        }

        public void AddProducer(Producer producer)
        {
            Producers.Add(producer);
        }

        public void DeleteProducer(int id)
        {
            Producers.Remove(GetProducerById(id));
        }

        public int GetProducerId()
        {
            int id = Producer.Last().Id + 1;
            return id;
        }
    }

}
