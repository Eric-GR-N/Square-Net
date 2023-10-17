

using AutoMapper;
using Domain.Dtos;
using Infrastructure.Entities;
using Presentation.RequestModels;
using Presentation.ResponseModels;

namespace Presentation.Profiles
{
    public class SquareNetProfile : Profile
    {
        public SquareNetProfile()
        {
            CreateMap<SquareNetRequestModel, SquareNet>();
            CreateMap<SquareNet, SquareNetResponseModel>();
            CreateMap<SquareNet, SquareNetDto>();
            CreateMap<SquareNetDto, SquareNet>();
        }

    }
}
