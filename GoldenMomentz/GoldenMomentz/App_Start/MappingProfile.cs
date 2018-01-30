using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using GoldenMomentz.Dtos;
using GoldenMomentz.Models;

namespace GoldenMomentz.App_Start
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            Mapper.CreateMap<Customer, CustomerDto>();
            Mapper.CreateMap<CustomerDto, Customer>()
                .ForMember(c => c.Id, opt => opt.Ignore());

            Mapper.CreateMap<SalesPerson, SalesPersonDto>();
            Mapper.CreateMap<SalesPersonDto, SalesPerson>()
                .ForMember(c => c.Id, opt => opt.Ignore());

            Mapper.CreateMap<Order, OrderDto>();
            Mapper.CreateMap<OrderDto, Order>()
                .ForMember(c => c.Id, opt => opt.Ignore());

            Mapper.CreateMap<Collection, CollectionDto>();
            Mapper.CreateMap<CollectionDto, Collection>()
                .ForMember(c => c.Id, opt => opt.Ignore());
        }
    }
}