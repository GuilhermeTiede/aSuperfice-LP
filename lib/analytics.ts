// Google Analytics 4 Event Tracking Helper

declare global {
  interface Window {
    gtag?: (
      command: string,
      action: string,
      params?: Record<string, any>
    ) => void;
  }
}

const GA_MEASUREMENT_ID = "G-PE3NEPXQNZ";
const AW_CONVERSION_ID = "AW-17950674353";

/**
 * Envia evento customizado para o Google Analytics 4
 * Usa transport_type: 'beacon' para garantir envio mesmo em navegação
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, {
      send_to: GA_MEASUREMENT_ID,
      transport_type: "beacon",
      ...eventParams,
    });
  }
};

/**
 * Evento: Usuário abriu a calculadora de orçamento
 * @param source - De onde foi aberta: "hero", "cta_final", "product_card", etc.
 */
export const trackCalculatorOpened = (source: string) => {
  trackEvent("calculator_opened", {
    source,
  });
};

/**
 * Evento: Usuário enviou o formulário da calculadora (clicou "Continuar no WhatsApp")
 * Também dispara conversão do Google Ads com callback para garantir registro
 */
export const trackCalculatorSubmitted = (params: {
  total_value: number;
  num_walls: number;
  products: string[];
  has_installation: boolean;
  has_files: boolean;
}) => {
  // Evento GA4
  trackEvent("calculator_submitted", {
    value: params.total_value,
    currency: "BRL",
    num_walls: params.num_walls,
    products: params.products.join(", "),
    has_installation: String(params.has_installation),
    has_files: String(params.has_files),
  });

  // Conversão Google Ads - Enviar formulário de lead (clique)
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "conversion", {
      send_to: "AW-17950674353/QqXwCKqjmvgbELGbxu9C",
      value: 1.0,
      currency: "BRL",
      event_callback: () => {},
    });
  }
};

/**
 * Evento: Usuário clicou no botão de WhatsApp direto (sem formulário)
 * @param source - Seção de origem: "hero", "cta_final", "corporate"
 * @param message_type - Tipo de mensagem: "direct", "specialist", "structured_quote"
 */
export const trackWhatsAppClick = (source: string, message_type?: string) => {
  trackEvent("whatsapp_clicked", {
    source,
    message_type: message_type || "direct",
  });
};
