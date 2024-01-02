using DesafioAPI.Dominio.Entidades;
using DesafioAPI.Dominio.Interfaces;
using MediatR;
using System.ComponentModel.DataAnnotations;
using System.Net;

namespace DesafioAPI.Aplicacao.Comandos.Cidades
{
    public class CadastrarCidadeCommand : IRequest<GenericoResponse>
    {
        [Required(ErrorMessage = "Necessário informar o nome.")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "Necessário informar o estado.")]
        public string Estado { get; set; }
    }

    public class CadastrarCidadeCommandHandler : IRequestHandler<CadastrarCidadeCommand, GenericoResponse>
    {
        private readonly ICidadeRepository cidadeRepository;

        public CadastrarCidadeCommandHandler(ICidadeRepository cidadeRepository)
        {
            this.cidadeRepository = cidadeRepository;
        }

        public async Task<GenericoResponse> Handle(CadastrarCidadeCommand request, CancellationToken cancellationToken)
        {
            var cidade = new Cidade(request.Nome, request.Estado);

            if (await cidadeRepository.Existe(cidade))
                return GenericoResponse.FalhaResponse("", "Já existe uma cidade cadastrada com esse nome e estado.");

            await cidadeRepository.Cadastrar(cidade);

            await cidadeRepository.SaveChangesAsync();

            return GenericoResponse.SucessoResponse(new { cidade.Id }, "Cidade cadastrada com sucesso.", HttpStatusCode.Created);
        }
    }
}
