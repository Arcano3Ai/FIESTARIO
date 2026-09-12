"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  FileText,
  User,
  ShieldCheck,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFiestario } from "@/lib/store";
import { formatMXN } from "@/lib/utils";

export default function MensajesPage() {
  const { conversations, sendMessage, currentUser } = useFiestario();
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || "");
  const [inputText, setInputText] = useState("");

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, inputText);
    setInputText("");
  };

  return (
    <div className="min-h-screen bg-fiestario-warmWhite py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl text-fiestario-carbon">
            Mensajes & Negociación
          </h1>
          <p className="text-xs text-fiestario-stone mt-1">
            Comunícate directamente con tus proveedores dentro de la plataforma.
          </p>
        </div>
        <Link href="/dashboard">
          <Button variant="outline" size="sm" className="gap-1.5">
            <ChevronLeft className="w-4 h-4" />
            <span>Volver a Mi Evento</span>
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-fiestario-stoneMuted/40 rounded-3xl overflow-hidden shadow-card grid grid-cols-1 md:grid-cols-3 h-[680px]">
        {/* Left: Conversations List */}
        <div className="border-r border-fiestario-stoneMuted/30 flex flex-col h-full bg-fiestario-cream/20">
          <div className="p-4 border-b border-fiestario-stoneMuted/30 bg-white">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-fiestario-carbon">
              Conversaciones Activas ({conversations.length})
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-fiestario-stoneMuted/20">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveConvId(conv.id)}
                className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                  conv.id === activeConversation?.id
                    ? "bg-white border-l-4 border-fiestario-gold shadow-subtle"
                    : "hover:bg-fiestario-cream/50"
                }`}
              >
                <img
                  src={conv.vendorAvatar}
                  alt={conv.vendorName}
                  className="w-11 h-11 rounded-xl object-cover border border-white shadow-sm shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-medium text-fiestario-carbon truncate">
                      {conv.vendorName}
                    </h4>
                    <span className="text-[10px] text-fiestario-stone shrink-0">
                      {conv.lastMessageTime}
                    </span>
                  </div>
                  <p className="text-xs text-fiestario-stone mt-1 truncate">
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Active Chat Thread */}
        <div className="md:col-span-2 flex flex-col h-full bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-fiestario-stoneMuted/30 flex items-center justify-between bg-fiestario-cream/10">
                <div className="flex items-center gap-3">
                  <img
                    src={activeConversation.vendorAvatar}
                    alt={activeConversation.vendorName}
                    className="w-10 h-10 rounded-xl object-cover border border-fiestario-gold/30"
                  />
                  <div>
                    <h3 className="font-serif text-base text-fiestario-carbon font-medium">
                      {activeConversation.vendorName}
                    </h3>
                    <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      En línea · Responde en minutos
                    </span>
                  </div>
                </div>

                <Link href={`/proveedores/${activeConversation.vendorSlug}`}>
                  <Button variant="outline" size="sm" className="text-xs">
                    Ver perfil
                  </Button>
                </Link>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-fiestario-cream/10">
                {activeConversation.messages.map((msg) => {
                  const isMe = msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          isMe
                            ? "bg-fiestario-carbon text-white rounded-br-none shadow-subtle"
                            : "bg-white border border-fiestario-stoneMuted/40 text-fiestario-carbon rounded-bl-none shadow-subtle"
                        }`}
                      >
                        <span className="block text-[10px] opacity-70 mb-1 font-semibold">
                          {msg.senderName}
                        </span>
                        <p>{msg.text}</p>
                      </div>
                      <span className="text-[10px] text-fiestario-stone mt-1 px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Message Input Box */}
              <form onSubmit={handleSend} className="p-4 border-t border-fiestario-stoneMuted/30 flex items-center gap-3 bg-white">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Escribe un mensaje al proveedor..."
                  className="flex-1 text-xs sm:text-sm px-4 py-3 rounded-full border border-fiestario-stoneMuted/50 bg-fiestario-cream/30 focus:outline-none focus:border-fiestario-gold"
                />
                <Button type="submit" variant="primary" size="md" className="rounded-full px-5 gap-2">
                  <span>Enviar</span>
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-sm text-fiestario-stone">
              Selecciona una conversación para comenzar a chatear.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
