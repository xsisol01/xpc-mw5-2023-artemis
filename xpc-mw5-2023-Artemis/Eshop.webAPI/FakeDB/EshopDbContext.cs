using Eshop.webAPI.Models;
using System.Collections.Generic;
using System.Reflection.Emit;
using System.Linq;
using System.Security.Cryptography;

namespace Eshop.webAPI.FakeDB
{
    public class FakeDb
    {
        private List<ProducerModel> producers = new List<ProducerModel>();

        ProducerModel producer1 = new ProducerModel()
        {
            Name = "Adidas",
            Country = "USA",
            Description = 

            
        }
        public void addProducer(ProducerModel newProducer)
        {
            producers.Add(newProducer);

        }


    }

}
