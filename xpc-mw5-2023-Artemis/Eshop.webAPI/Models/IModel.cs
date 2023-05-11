using System;
using System.Text.Json.Serialization;

namespace Eshop.webAPI.Models
{
    public interface IModel
    {
        Guid Id { get; set; }
    }
}
