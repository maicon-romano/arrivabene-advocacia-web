
import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Instagram,
  Facebook,
} from "lucide-react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";

const ContatoSection = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const { toast } = useToast();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    assunto: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_fqu40yi",
        "template_gs2so7e",
        {
          from_name: formData.nome,
          to_name: "Arrivabene Advocacia",
          from_email: formData.email,
          email: formData.email,
          to_email: "contato@arrivabeneadvocacia.com.br",
          message: formData.assunto,
          reply_to: formData.email,
          phone: formData.telefone,
          subject: formData.assunto,
        },
        "Gl9wbUo14WsEMl_uf"
      )
      .then((response) => {
        console.log("Email sent successfully!", response);
        toast({
          title: "Mensagem enviada",
          description: "Entraremos em contato em breve!",
        });

        setFormData({
          nome: "",
          email: "",
          telefone: "",
          assunto: "",
        });
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast({
          title: "Erro ao enviar mensagem",
          description:
            "Por favor, tente novamente ou entre em contato por telefone.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const handlePhoneClick = () => {
    window.open("tel:+5519998223557");
  };

  const handleEmailClick = () => {
    window.open("mailto:contato@arrivabeneadvocacia.com.br");
  };

  const handleMapClick = () => {
    window.open("https://maps.app.goo.gl/pr7z71w7Lj4nEkEn7", "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open(
      "https://api.whatsapp.com/send/?phone=5519998223557&text=Olá!+Quero+saber+mais+sobre+os+serviços+jurídicos.+Vim+pelo+site.&type=phone_number&app_absent=0",
      "_blank"
    );
  };

  return (
    <section id="contato" className="py-16 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2
            className={cn(
              "text-3xl md:text-4xl font-bold text-primary mb-4 font-playfair",
              inView ? "opacity-100 animate-slide-up" : "opacity-0"
            )}
          >
            Entre em Contato
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          <p
            className={cn(
              "max-w-2xl mx-auto text-gray-600 font-lora",
              inView ? "opacity-100 animate-slide-up" : "opacity-0"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            Estamos prontos para ajudar. Entre em contato conosco para uma
            consulta inicial.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div
            className={cn(
              "bg-white p-8 rounded-lg shadow-lg",
              inView ? "opacity-100 animate-slide-up" : "opacity-0"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            <h3 className="text-2xl font-semibold text-primary mb-6 font-playfair">
              Envie uma Mensagem
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-gray-700 mb-2 font-lora"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-lora"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 mb-2 font-lora"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-lora"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="telefone"
                  className="block text-gray-700 mb-2 font-lora"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-lora"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <label
                  htmlFor="assunto"
                  className="block text-gray-700 mb-2 font-lora"
                >
                  Assunto
                </label>
                <textarea
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent font-lora"
                  required
                  disabled={isSubmitting}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-md flex items-center justify-center w-full transition-all font-lora"
              >
                {isSubmitting ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send size={18} className="mr-2" />
                    Enviar Mensagem
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Info & Map */}
          <div>
            <div
              className={cn(
                "bg-white p-8 rounded-lg shadow-lg mb-8",
                inView ? "opacity-100 animate-slide-up" : "opacity-0"
              )}
              style={{ animationDelay: "0.5s" }}
            >
              <h3 className="text-2xl font-semibold text-primary mb-6 font-playfair">
                Informações de Contato
              </h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <button
                    onClick={handlePhoneClick}
                    className="text-accent hover:text-primary mr-4 mt-1 transition-colors"
                  >
                    <Phone size={20} />
                  </button>
                  <div>
                    <h4 className="font-medium font-playfair">Telefone</h4>
                    <button
                      onClick={handlePhoneClick}
                      className="text-gray-600 hover:text-accent transition-colors font-lora"
                    >
                      (19) 9 9822-3557
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <button
                    onClick={handleEmailClick}
                    className="text-accent hover:text-primary mr-4 mt-1 transition-colors"
                  >
                    <Mail size={20} />
                  </button>
                  <div>
                    <h4 className="font-medium font-playfair">Email</h4>
                    <button
                      onClick={handleEmailClick}
                      className="text-gray-600 hover:text-accent transition-colors font-lora"
                    >
                      contato@arrivabeneadvocacia.com.br
                    </button>
                  </div>
                </div>

                <div className="flex items-start">
                  <button
                    onClick={handleMapClick}
                    className="text-accent hover:text-primary mr-4 mt-1 transition-colors"
                  >
                    <MapPin size={20} />
                  </button>
                  <div>
                    <h4 className="font-medium font-playfair">Endereço</h4>
                    <button
                      onClick={handleMapClick}
                      className="text-gray-600 hover:text-accent transition-colors text-left font-lora"
                    >
                      R. Dez de Abril, 516 - Centro, Artur Nogueira - SP,
                      13160-162
                    </button>
                  </div>
                </div>

                <div className="flex items-center pt-4">
                  <h4 className="font-medium mr-4 font-playfair">Redes Sociais:</h4>
                  <a
                    href="https://www.instagram.com/arrivabeneadvocacia/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary mr-4 transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=61575479817862"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-primary transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                </div>

                <div className="pt-4">
                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-md flex items-center justify-center transition-all font-lora"
                  >
                    <i className="fa-brands fa-whatsapp mr-2 text-lg"></i>
                    Falar pelo WhatsApp
                  </button>
                </div>
              </div>
            </div>

            <div
              className={cn(
                "rounded-lg overflow-hidden shadow-lg",
                inView ? "opacity-100 animate-slide-up" : "opacity-0"
              )}
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="https://maps.app.goo.gl/pr7z71w7Lj4nEkEn7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14736.529048044073!2d-47.183713873365825!3d-22.57415605801065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c88d7fa9c9e5b7%3A0x90533d5a74897a61!2sEduardo%20Arrivabene%20Advocacia!5e0!3m2!1spt-BR!2sbr!4v1746056828878!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="300"
                  style={{ border: 0, pointerEvents: "auto" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização Arrivabene Advocacia"
                ></iframe>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContatoSection;
