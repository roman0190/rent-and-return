"use client";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Lock,
  Globe,
  CreditCard,
  Shield,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { defaultLocale, Locale } from "@/i18n/config";
import { useTranslations } from "next-intl";

const SettingPage = () => {
  const t = useTranslations("settings");
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = (pathname.split("/")[1] || defaultLocale) as Locale;

  const handleLanguageChange = (newLang: string) => {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="mb-2">{t("title")}</h1>
        <p className="text-gray-600">{t("subtitle")}</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="mb-4">{t("accountSettings")}</h2>

          <Link href="/change-password">
            <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Lock className="size-5 text-indigo-600" />
                </div>
                <div>
                  <p>{t("changePassword")}</p>
                  <p className="text-sm text-gray-600">{t("updatePassword")}</p>
                </div>
              </div>
              <ChevronRight className="size-5 text-gray-400" />
            </div>
          </Link>

          <div className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <Shield className="size-5 text-green-600" />
              </div>
              <div>
                <p>{t("twoFactorAuth")}</p>
                <p className="text-sm text-gray-600">
                  {t("twoFactorAuthDescription")}
                </p>
              </div>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Bell className="size-5 text-blue-600" />
            </div>
            <h2>{t("notificationPreferences")}</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="email-notifications">
                  {t("emailNotifications")}
                </Label>
                <p className="text-sm text-gray-600">
                  {t("receiveEmailNotifications")}
                </p>
              </div>
              <Switch id="email-notifications" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="rental-updates">{t("rentalUpdates")}</Label>
                <p className="text-sm text-gray-600">{t("getRentalUpdates")}</p>
              </div>
              <Switch id="rental-updates" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messages">{t("messageNotifications")}</Label>
                <p className="text-sm text-gray-600">
                  {t("receiveMessageNotifications")}
                </p>
              </div>
              <Switch id="messages" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="reviews">{t("reviewNotifications")}</Label>
                <p className="text-sm text-gray-600">
                  {t("receiveReviewNotifications")}
                </p>
              </div>
              <Switch id="reviews" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketing">{t("marketingEmails")}</Label>
                <p className="text-sm text-gray-600">
                  {t("receiveMarketingEmails")}
                </p>
              </div>
              <Switch id="marketing" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="mb-4">{t("preferences")}</h2>

          <div className="space-y-4">
            <div>
              <Label htmlFor="language" className="mb-2 block">
                {t("selectLanguage")}
              </Label>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Globe className="size-5 text-purple-600" />
                </div>
                <Select
                  value={currentLang}
                  onValueChange={handleLanguageChange}
                >
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={t("selectLanguage")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">{t("languageEnglish")}</SelectItem>
                    <SelectItem value="bn">{t("languageBengali")}</SelectItem>
                    {/* <SelectItem value="hi">{t("languageHindi")}</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="currency" className="mb-2 block">
                {t("selectCurrency")}
              </Label>
              <div className="flex items-center gap-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <CreditCard className="size-5 text-yellow-600" />
                </div>
                <Select defaultValue="bdt">
                  <SelectTrigger className="flex-1">
                    <SelectValue placeholder={t("selectCurrency")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bdt">BDT (৳)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Help & Support */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <HelpCircle className="size-5 text-orange-600" />
            </div>
            <h2>{t("helpSupport")}</h2>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-between">
              {t("getHelp")}
              <ChevronRight className="size-4" />
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/terms-of-service">
                {t("termsOfService")}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between"
            >
              <Link href="/privacy-policy">
                {t("privacyPolicy")}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full justify-between text-red-600 hover:text-red-700"
            >
              <Link href="/delete-account">
                {t("deleteAccount")}
                <ChevronRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingPage;
