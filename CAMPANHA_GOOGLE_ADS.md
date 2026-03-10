# Campanha Google Ads — aSuperfície

## Dados da Campanha

| Campo | Valor |
|-------|-------|
| **Nome** | Search \| Leads \| Atelie Impressao \| BR |
| **Status** | Ativado |
| **Objetivo** | Leads (Enviar formulários de lead) |
| **Rede** | Rede de pesquisa do Google |
| **Orçamento** | R$ 30,00/dia |
| **Lances** | Maximizar conversões (CPA desejado: R$ 54,85) |
| **Localização** | Rio de Janeiro, Brasil (estado) |
| **Idioma** | Português |
| **Data de início** | 13 de fevereiro de 2026 |
| **Data de término** | Não definida |

### Configurações adicionais

- Correspondência ampla: **Desativada**
- Recursos automáticos: **Desativado** (apenas os enviados manualmente)
- AI Max: **Desativada** (personalização de texto e expansão de URL final desativadas)
- Rotação de anúncios: Otimizar (priorizar melhor desempenho)
- Exclusões de IP: Nenhuma

---

## Métricas — Período: 13/fev a 10/mar/2026

### Google Ads

| Métrica | Valor |
|---------|-------|
| Impressões | 5.454 |
| Cliques | 333 |
| CTR | ~6,1% |
| CPC médio | R$ 1,02 |
| Custo total | R$ 339,83 |

### Google Analytics (GA4) — Últimos 30 dias

| Métrica | Valor |
|---------|-------|
| Usuários ativos (30 dias) | 275 |
| Usuários ativos (7 dias) | 61 |
| Usuários ativos (1 dia) | 18 |
| Visualizações de página | 80 |
| Sessões Paid Search | 44 |
| Sessões Direct | 10 |
| Sessões Unassigned | 8 |
| Sessões Organic Social | 4 |
| Sessões Organic Search | 3 |
| Sessões Referral | 1 |
| First visits | 54 |

### Eventos GA4 (Contagem)

| Evento | Contagem |
|--------|----------|
| page_view | 80 |
| session_start | 70 |
| first_visit | 54 |
| calculator_dimensions_entered | 98 |
| user_engagement | 36 |
| calculator_opened | 32 |
| calculator_product_selected | 35 |

### PageSpeed Insights

| Métrica | Celular | Computador |
|---------|---------|------------|
| Desempenho | 98 | 93 |
| Acessibilidade | 85 | 85 |
| Práticas recomendadas | 96 | 96 |
| SEO | 100 | — |

---

## Problemas Identificados

### 1. Discrepância crítica: Cliques × Sessões

- Google Ads registra **333 cliques**
- GA4 registra **44 sessões Paid Search**
- **~87% dos cliques não estão sendo registrados como sessão no GA4**
- Performance da página descartada como causa (PageSpeed 93-98)
- Possíveis causas: bloqueadores, GA4 não carregando a tempo, vinculação Ads ↔ GA4

### 2. Evento de conversão não enviado corretamente

- O evento `calculator_submitted` **não aparecia nos dados do GA4**
- A conversão do Google Ads não usava `transport_type: 'beacon'`
- O redirect para WhatsApp (via tag `<a>`) acontecia antes dos eventos serem enviados
- O valor da conversão estava fixo em `1.0` ao invés do valor real do orçamento

### 3. Mudança de estratégia de lances

- Anteriormente: **Maximizar Cliques**
- Atualmente: **Maximizar Conversões** (CPA desejado: R$ 54,85)
- Resultado: aumento do CPC (cliques mais qualificados, porém mais caros)
- Com orçamento de R$ 30/dia e CPA de R$ 54,85, espera-se no máximo ~16 conversões/mês

---

## Ajustes Realizados — 10/mar/2026

### Arquivo: `lib/analytics.ts`

1. **Adicionado `transport_type: 'beacon'`** à conversão do Google Ads
   - Garante que o evento é enviado mesmo durante navegação/redirect
2. **Valor da conversão agora usa o valor real** (`params.total_value`) ao invés de `1.0` fixo
3. **Adicionado parâmetro `callback`** à função `trackCalculatorSubmitted`
   - Permite controlar quando o redirect acontece (somente após envio dos eventos)
4. **Fallback adicionado** caso `window.gtag` não esteja disponível

### Arquivo: `components/QuoteCalculator.tsx`

1. **Botão "Continuar no WhatsApp" mudado de `<a>` para `<button>`**
   - Evita redirect imediato que impedia o envio dos eventos
2. **Redirect via `window.open()` após callback** do evento de conversão
3. **Fallback de 500ms** — abre o WhatsApp mesmo se o callback não disparar
4. **Flag anti-duplicação** — evita abrir o WhatsApp duas vezes (callback + fallback)

---

## Recomendações Pendentes

- [ ] Verificar vinculação Google Ads ↔ GA4 (`G-PE3NEPXQNZ`)
- [ ] Após deploy, testar fluxo completo usando GA4 DebugView
- [ ] Monitorar por 2–3 dias se `calculator_submitted` aparece no GA4
- [ ] Considerar remover CPA desejado temporariamente para dar liberdade ao algoritmo
- [ ] Avaliar aumento de orçamento para R$ 50–60/dia para acelerar aprendizado
- [ ] Avaliar ativação do AI Max para ganhar mais conversões com orçamento limitado
