using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.Models;

namespace Eshop.webAPI.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer()
        {
            CreateMap<Category, CategoryDTO>().ReverseMap();
            CreateMap<Category, CreateCategoryDTO>().ReverseMap();
        }  
    }
}
