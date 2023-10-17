using AutoMapper;
using Domain.Dtos;
using Infrastructure.Entities;
using Presentation.Requests;
using Presentation.ResponseModels;

namespace Presentation.Profiles
{
    public class SquareProfile : Profile
    {
        public SquareProfile()
        {
            CreateMap<SquareRequestModel, Square>();
            CreateMap<Square, SquareResponseModel>();

            CreateMap<Square, SquareDto>();
            CreateMap<SquareDto, Square>();

            CreateMap<SquareDto, SquareResponseModel>();
            CreateMap<SquareResponseModel, SquareDto>();
        }
    }
}
