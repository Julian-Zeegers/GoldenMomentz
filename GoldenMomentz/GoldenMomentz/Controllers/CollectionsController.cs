using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using AutoMapper;
using GoldenMomentz.Dtos;
using GoldenMomentz.Models;
using System.Data.Entity;

namespace GoldenMomentz.Controllers
{
 
        [EnableCors(origins: "*", headers: "*", methods: "*")]
        public class CollectionsController : ApiController
        {
            private ApplicationDbContext _context;

            public CollectionsController()
            {
                _context = new ApplicationDbContext();
            }

            // GET /api/Collections
            public IHttpActionResult GetCollections(string query = null)
            {
                var collectionsQuery = _context.Collections.Include(o => o.Order).Include(c => c.Order.Customer);

                var collectionsDtos = collectionsQuery
                    .ToList()
                    .Select(Mapper.Map<Collection, CollectionDto>);

                return Ok(collectionsDtos);
            }

            // GET /api/Collections/1
            public IHttpActionResult GetCollection(int id)
            {
                var collection = _context.Collections.SingleOrDefault(c => c.Id == id);

                if (collection == null)
                    return NotFound();

                return Ok(Mapper.Map<Collection, CollectionDto>(collection));
            }

            // POST /api/Collections
            [HttpPost]
            public IHttpActionResult CreateCollection(CollectionDto collectionDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest("Invalid Input Data for new Collection");

                var collection = Mapper.Map<CollectionDto, Collection>(collectionDto);

                _context.Collections.Add(collection);
                _context.SaveChanges();

                collectionDto.Id = collection.Id;

                return Created(new Uri(Request.RequestUri + "/" + collection.Id), collectionDto);
            }

            // Put /api/Collections/1
            [HttpPut]
            public IHttpActionResult UpdateCollection(int id, CustomerDto collectionDto)
            {
                if (!ModelState.IsValid)
                    return BadRequest();

                var collectionInDb = _context.Collections.SingleOrDefault(c => c.Id == id);

                if (collectionInDb == null)
                    return NotFound();

                Mapper.Map(collectionDto, collectionInDb);

                _context.SaveChanges();

                return Ok();

            }

            // DELETE /api/Collections/1
            [HttpDelete]
            public IHttpActionResult DeleteCollection(int id)
            {

                var collectionInDb = _context.Collections.SingleOrDefault(c => c.Id == id);

                if (collectionInDb == null)
                    return NotFound();

                _context.Collections.Remove(collectionInDb);
                _context.SaveChanges();

                return Ok();

            }
        }
    }

