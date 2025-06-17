import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiSend,
  FiCheck,
} from "react-icons/fi";
import { supabase } from "../lib/supabase";

export default function Contact() {
  const [contactInfo, setContactInfo] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchContactInfo();
  }, []);

  const fetchContactInfo = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_info")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

      if (error) throw error;
      setContactInfo(data || []);
    } catch (error) {
      console.error("Error fetching contact info:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting message:", error);
      alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIconComponent = (iconName) => {
    const icons = {
      FiMapPin: FiMapPin,
      FiPhone: FiPhone,
      FiMail: FiMail,
      FiClock: FiClock,
    };
    const IconComponent = icons[iconName] || FiMapPin;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 pt-20"
        >
          <h1
            className="text-hero mb-4 font-poppins"
            style={{ color: "var(--color-cafenity-dark)" }}
          >
            Hubungi Kami
          </h1>
          <p
            className="text-lg max-w-2xl mx-auto font-barlow"
            style={{ color: "var(--color-teks-samping)" }}
          >
            Kami siap membantu Anda. Jangan ragu untuk menghubungi kami.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info - Dynamic from Database */}
          <div className="space-y-8">
            {contactInfo.map((info) => (
              <div key={info.id} className="flex items-start space-x-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "var(--color-cafenity-primary)" }}
                >
                  {getIconComponent(info.icon_name)}
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-2 font-poppins"
                    style={{ color: "var(--color-cafenity-dark)" }}
                  >
                    {info.title}
                  </h3>
                  <p
                    className="font-barlow"
                    style={{ color: "var(--color-teks-samping)" }}
                  >
                    {info.content.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < info.content.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-custom">
            <h3
              className="text-2xl font-bold mb-6 font-poppins"
              style={{ color: "var(--color-cafenity-dark)" }}
            >
              Kirim Pesan
            </h3>

            {submitSuccess && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center"
              >
                <FiCheck className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-green-700 font-medium">
                  Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2 font-poppins"
                  style={{ color: "var(--color-teks)" }}
                >
                  Nama
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: "var(--color-garis)" }}
                  placeholder="Nama lengkap Anda"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2 font-poppins"
                  style={{ color: "var(--color-teks)" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: "var(--color-garis)" }}
                  placeholder="email@example.com"
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-2 font-poppins"
                  style={{ color: "var(--color-teks)" }}
                >
                  Pesan
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border rounded-lg focus-custom font-barlow"
                  style={{ borderColor: "var(--color-garis)" }}
                  placeholder="Tulis pesan Anda di sini..."
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`btn-primary w-full flex items-center justify-center space-x-2 ${
                  isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Mengirim...</span>
                  </>
                ) : (
                  <>
                    <FiSend className="w-5 h-5" />
                    <span>Kirim Pesan</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
