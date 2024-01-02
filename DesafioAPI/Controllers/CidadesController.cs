using DesafioAPI.Aplicacao;
using DesafioAPI.Aplicacao.Comandos.Cidades;
using DesafioAPI.Aplicacao.Consultas.Cidades;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace DesafioAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CidadesController : ControllerBase
    {
        private readonly IMediator mediator;

        public CidadesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        /// <summary>
        /// Cadastrar uma cidade.
        /// </summary>
        /// <returns>Cidade cadastrada</returns>
        /// <response code="204">Retorna o ID da cidade cadastrada</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpPost("Cadastrar")]
        public async Task<ActionResult<GenericoResponse>> CadastrarCidade([FromBody] CadastrarCidadeCommand request)
        {
            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Consultar a(s) cidade(s) por nome.
        /// </summary>
        /// <returns>Cidades de acordo com o filtro</returns>
        /// <response code="200">Retorna a lista das cidades</response>
        /// <response code="404">Nenhuma cidade encontrada</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpGet("Consultar/Nome/{Nome?}")]
        public async Task<ActionResult<GenericoResponse>> ConsultarCidadePorNome([FromRoute] ConsultarCidadePorNomeQuery request)
        {
            var response = await mediator.Send(request);

            return response;
        }

        /// <summary>
        /// Consultar a(s) cidade(s) por estado.
        /// </summary>
        /// <returns>Cidades de acordo com o filtro</returns>
        /// <response code="200">Retorna a lista das cidades</response>
        /// <response code="404">Nenhuma cidade encontrada</response>
        /// <response code="400">Um ou mais erro de validação</response>
        [HttpGet("Consultar/Estado/{Estado?}")]
        public async Task<ActionResult<GenericoResponse>> ConsultarCidadePorEstado([FromRoute] ConsultarCidadePorEstadoQuery request)
        {
            var response = await mediator.Send(request);

            return response;
        }
    }
}
