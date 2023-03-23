using Eshop.webAPI.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Linq;
using System.Security.Cryptography;

namespace Eshop.webAPI.FakeDB
{
    public static class FakeDb
    {
        private static List<ProducerModel> producers = new List<ProducerModel>();

        
        public static List<ProducerModel> getProducers()
        {
            return producers;

        }

        public static void addProducer(ProducerModel newProducer)
        {
            producers.Add(newProducer);
        }

        public static void initializeFakeDb()
        {
            ProducerModel producer1 = new ProducerModel()
            {
                Name = "Adidas",
                ImageUrl = "fjalsdjflkasdjfla",
                Description = "Adidas is us brand producing clothes since xxxx.",
                Country = "USA",

            };

            ProducerModel producer2 = new ProducerModel()
            {
                Name = "Nike",
                ImageUrl = "fjalsdjflkasdjfla",
                Description = "Nike is us brand producing clothes since xxxx.",
                Country = "USA",

            };

            producers.Add(producer1);
            producers.Add(producer2);

        }


    }

}
