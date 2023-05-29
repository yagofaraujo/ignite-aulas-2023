# Atividade: Mapeando o domínio

> ⚠️ Nessa atividade você irá ler uma conversa entre um Domain Expert e um desenvolvedor responsável por criar a aplicação. O seu objetivo é identificar as entidades e casos de uso para essa aplicação com base nessa conversa!

<span style="font-weight: bold; color:green">Dev</span>: Olá, obrigado por participar da entrevista. Para começar, quais são as principais funcionalidades que você gostaria de ver nesse sistema de gerenciamento de estoque?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Precisamos de uma solução que nos permita rastrear cada produto individualmente, definir quantidades mínimas de estoque e receber alertas quando estivermos ficando sem um determinado produto. Também seria útil se pudéssemos visualizar o histórico de vendas e estoque para ajudar a tomarmos decisões futuras de compra.

<span style="font-weight: bold; color:green">Dev</span>: Entendi. Você poderia me dar um exemplo de como você gostaria que a funcionalidade de rastreamento individual de produto funcionasse?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Gostaríamos de poder atribuir um número de identificação único a cada produto, para podermos rastrear facilmente suas movimentações em nosso estoque. Também seria útil se pudéssemos adicionar informações extras, como tamanho e cor, para tornar o rastreamento ainda mais preciso.

<span style="font-weight: bold; color:green">Dev</span>:  E quanto a funcionalidade de definição de quantidades mínimas de estoque, como você imaginaria isso funcionando?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Gostaríamos de poder definir um limite mínimo para cada produto, de forma que pudéssemos receber um alerta quando o estoque estiver chegando próximo ao fim. Isso nos ajudaria a garantir que nunca fiquemos sem um produto popular e também nos permitiria fazer pedidos mais eficientes.

<span style="font-weight: bold; color:green">Dev</span>: E como você gostaria de receber esses alertas? Por e-mail, SMS ou algum outro método?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Seria ótimo se pudéssemos receber alertas por e-mail e também por meio de uma notificação em nosso sistema de gerenciamento de estoque.

<span style="font-weight: bold; color:green">Dev</span>: Entendi. E quanto a funcionalidade de visualização de histórico de vendas e estoque, que tipo de informações você gostaria de ver?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Gostaríamos de poder ver quantos produtos vendemos em um determinado período, qual foi o lucro gerado por produto e quais produtos estão vendendo melhor em cada período. Também seria útil se pudéssemos observar as tendências de estoque ao longo do tempo, para nos ajudar a tomar decisões de compra mais adequadas.

<span style="font-weight: bold; color:green">Dev</span>:  Ok, e você tem alguma outra funcionalidade que gostaria de ver no sistema?

<span style="font-weight: bold; color:orange">Domain Expert</span>: Seria muito útil se o sistema pudesse nos permitir criar e gerenciar ordens de compra automaticamente, com base nas quantidades mínimas de estoque definidas e nas tendências de vendas. Também seria ótimo se pudéssemos integrar o sistema com nossos fornecedores, para que pudéssemos receber atualizações automáticas sobre os prazos de entrega de novas remessas.

## O que você deve procurar?

Dado o diálogo acima, você deve conseguir responder as seguintes perguntas:

- Quais as entidades de domínio?
- Quais as ações (casos de uso) que essa aplicação deve ter?