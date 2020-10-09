using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserItemsController : ControllerBase
    {
        private readonly UserContext _context;

        public UserItemsController(UserContext context)
        {
            _context = context;
        }

        // GET: api/UserItems
        [HttpGet]
        public async Task<ActionResult <IEnumerable<UserItem>>> GetUserItems([FromQuery] string name)
        {
            if(name != null){
                return await _context.UserItems.Where((x => x.name == name)).ToListAsync();
            }
            return await _context.UserItems.ToListAsync();
        }

        // GET: api/UserItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserItem>> GetUserItem(long id)
        {
            var userItem = await _context.UserItems.FirstOrDefaultAsync((x => x.cpf == id.ToString() || x.rg == id.ToString()));
            
            if (userItem == null)
            {
                return NotFound();
            }

            return userItem;
        }

        // PUT
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUserItem(long id, UserItem userItem)
        {
            if (id != userItem.id)
            {
                return BadRequest();
            }

            _context.Entry(userItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST
        [HttpPost]
        public async Task<ActionResult<UserItem>> PostUserItem(UserItem userItem)
        {
            //Backend Validation
            if(userItem.name.Any(char.IsDigit)
                || !userItem.cpf.All(char.IsDigit)
                || !userItem.rg.All(char.IsDigit) 
                || userItem.cpf.Length != 11
                || userItem.rg.Length != 9){
                    return StatusCode(406);
                }

            var itemCheck = await _context.UserItems.FirstOrDefaultAsync((x => x.cpf == userItem.cpf || x.rg == userItem.rg));
            
            if(itemCheck != null){
                return StatusCode(409);
            }

            _context.UserItems.Add(userItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserItem), new { id = userItem.id}, userItem);
        }

        // DELETE: api/UserItems/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<UserItem>> DeleteUserItem(long id)
        {
            var userItem = await _context.UserItems.FirstOrDefaultAsync((x => x.cpf == id.ToString() || x.rg == id.ToString()));
            if (userItem == null)
            {
                return NotFound();
            }

            _context.UserItems.Remove(userItem);
            await _context.SaveChangesAsync();

            return userItem;
        }

        private bool UserItemExists(long id)
        {
            return _context.UserItems.Any(e => e.id == id);
        }
    }
}
