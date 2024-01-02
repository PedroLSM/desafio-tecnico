using DesafioAPI.Aplicacao;
using DesafioAPI.Aplicacao.Comandos.Clientes;
using DesafioAPI.Aplicacao.Consultas.Clientes;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DesafioAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ClientesController : ControllerBase
    {
        private readonly IMediator mediator;

        public ClientesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        /// Cadastrar um cliente.
        /// </summary>
        /// <returns>Cliente cadastrado</returns>
        /// <response code="204">Retorna o ID do cliente cadastrado</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpPost("Cadastrar")]
        public async Task<ActionResult<GenericoResponse>> CadastrarCliente([FromBody] CadastrarClienteCommand request)
        {
            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Consultar o(s) clientes(s) por nome.
        /// </summary>
        /// <returns>Clientes de acordo com o filtro</returns>
        /// <response code="200">Retorna a lista das clientes</response>
        /// <response code="404">Nenhum cliente encontrado</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpGet("Consultar/Nome/{Nome?}")]
        public async Task<ActionResult<GenericoResponse>> ConsultarClientePorNome([FromRoute] ConsultarClientesPorNomeQuery request)
        {
            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Consultar o cliente por id.
        /// </summary>
        /// <returns>Clientes de acordo com o filtro</returns>
        /// <response code="200">Retorna a lista das clientes</response>
        /// <response code="404">Nenhum cliente encontrado</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpGet("Consultar/Id/{Id=0}")]
        public async Task<ActionResult<GenericoResponse>> ConsultarClientePorId([FromRoute] ConsultarClientesPorIdQuery request)
        {
            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Alterar nome de um cliente.
        /// </summary>
        /// <returns>Nome do cliente alterado</returns>
        /// <response code="200">Retorna o ID e nome do cliente alterado</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpPut("Alterar/{id}")]
        public async Task<ActionResult<GenericoResponse>> AlterarNomeCliente([FromRoute] int id, [FromBody] AlterarNomeClienteCommand request)
        {
            if (id != request.Id)
                return BadRequest();

            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Remover um cliente.
        /// </summary>
        /// <returns>Cliente removido</returns>
        /// <response code="200">Cliente removido</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpDelete("Remover/{Id}")]
        public async Task<ActionResult<GenericoResponse>> RemoverCliente([FromRoute] RemoverClienteCommand request)
        {
            var response = await mediator.Send(request);

            return response;
        }
    }
}