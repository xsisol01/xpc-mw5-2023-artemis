using AutoMapper;
using Eshop.webAPI.DTO;
using Eshop.webAPI.Models;

namespace Eshop.webAPI.Configurations
{
    public class MapperInitializer : Profile
    {
        public MapperInitializer()
        {
            CreateMap<CategoryModel, CategoryDTO>().ReverseMap();
            CreateMap<CategoryModel, CreateCategoryDTO>().ReverseMap();
            CreateMap<ManufacturerModel, ManufacturerDTO>().ForMember(dest => dest.CommodityIds, opt => opt.MapFrom(src => src.Commodities.Select(c => c.Id))).ReverseMap();
            CreateMap<ManufacturerModel, CreateManufacturerDTO>().ReverseMap();
            CreateMap<CommodityModel, CommodityDTO>().ReverseMap();
            CreateMap<CommodityModel, CreateCommodityDTO>().ReverseMap();
            CreateMap<ReviewModel, ReviewDTO>().ReverseMap();
            CreateMap<ReviewModel, CreateReviewDTO>().ReverseMap();

        }
    }
}
