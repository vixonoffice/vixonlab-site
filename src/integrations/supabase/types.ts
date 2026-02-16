export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          budget: string
          created_at: string
          details: string
          email: string
          id: string
          name: string
          phone: string | null
          project_type: string
          status: string
        }
        Insert: {
          budget: string
          created_at?: string
          details: string
          email: string
          id?: string
          name: string
          phone?: string | null
          project_type: string
          status?: string
        }
        Update: {
          budget?: string
          created_at?: string
          details?: string
          email?: string
          id?: string
          name?: string
          phone?: string | null
          project_type?: string
          status?: string
        }
        Relationships: []
      }
      portfolio_projects: {
        Row: {
          category: string
          created_at: string
          description_en: string
          description_ro: string
          id: string
          image_url: string | null
          sort_order: number
          subtitle_en: string
          subtitle_ro: string
          tags: string[]
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description_en?: string
          description_ro?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          subtitle_en?: string
          subtitle_ro?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description_en?: string
          description_ro?: string
          id?: string
          image_url?: string | null
          sort_order?: number
          subtitle_en?: string
          subtitle_ro?: string
          tags?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      pricing_plans: {
        Row: {
          created_at: string
          cta_label_en: string
          cta_label_ro: string
          description_en: string
          description_ro: string
          features_en: string[]
          features_ro: string[]
          id: string
          is_popular: boolean
          name_en: string
          name_ro: string
          price_label_en: string
          price_label_ro: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          cta_label_en?: string
          cta_label_ro?: string
          description_en?: string
          description_ro?: string
          features_en?: string[]
          features_ro?: string[]
          id?: string
          is_popular?: boolean
          name_en?: string
          name_ro?: string
          price_label_en?: string
          price_label_ro?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          cta_label_en?: string
          cta_label_ro?: string
          description_en?: string
          description_ro?: string
          features_en?: string[]
          features_ro?: string[]
          id?: string
          is_popular?: boolean
          name_en?: string
          name_ro?: string
          price_label_en?: string
          price_label_ro?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      process_steps: {
        Row: {
          created_at: string
          description_en: string
          description_ro: string
          id: string
          sort_order: number
          step_number: string
          title_en: string
          title_ro: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description_en?: string
          description_ro?: string
          id?: string
          sort_order?: number
          step_number?: string
          title_en?: string
          title_ro?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description_en?: string
          description_ro?: string
          id?: string
          sort_order?: number
          step_number?: string
          title_en?: string
          title_ro?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          anchor: string | null
          created_at: string
          description_en: string
          description_ro: string
          features_en: string[]
          features_ro: string[]
          icon: string
          icon_gradient: string
          id: string
          price_label_en: string | null
          price_label_ro: string | null
          sort_order: number
          title_en: string
          title_ro: string
          updated_at: string
        }
        Insert: {
          anchor?: string | null
          created_at?: string
          description_en?: string
          description_ro?: string
          features_en?: string[]
          features_ro?: string[]
          icon?: string
          icon_gradient?: string
          id?: string
          price_label_en?: string | null
          price_label_ro?: string | null
          sort_order?: number
          title_en?: string
          title_ro?: string
          updated_at?: string
        }
        Update: {
          anchor?: string | null
          created_at?: string
          description_en?: string
          description_ro?: string
          features_en?: string[]
          features_ro?: string[]
          icon?: string
          icon_gradient?: string
          id?: string
          price_label_en?: string | null
          price_label_ro?: string | null
          sort_order?: number
          title_en?: string
          title_ro?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          key: string
          section: string
          updated_at: string
          updated_by: string | null
          value_en: string
          value_ro: string
        }
        Insert: {
          id?: string
          key: string
          section: string
          updated_at?: string
          updated_by?: string | null
          value_en?: string
          value_ro?: string
        }
        Update: {
          id?: string
          key?: string
          section?: string
          updated_at?: string
          updated_by?: string | null
          value_en?: string
          value_ro?: string
        }
        Relationships: []
      }
      stats: {
        Row: {
          created_at: string
          id: string
          label_en: string
          label_ro: string
          sort_order: number
          updated_at: string
          value: string
        }
        Insert: {
          created_at?: string
          id?: string
          label_en?: string
          label_ro?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Update: {
          created_at?: string
          id?: string
          label_en?: string
          label_ro?: string
          sort_order?: number
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      tech_stack: {
        Row: {
          created_at: string
          id: string
          name: string
          sort_order: number
        }
        Insert: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          sort_order?: number
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          author_initial: string
          author_name: string
          author_role: string
          avatar_gradient: string
          created_at: string
          id: string
          quote_en: string
          quote_ro: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          author_initial?: string
          author_name?: string
          author_role?: string
          avatar_gradient?: string
          created_at?: string
          id?: string
          quote_en?: string
          quote_ro?: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          author_initial?: string
          author_name?: string
          author_role?: string
          avatar_gradient?: string
          created_at?: string
          id?: string
          quote_en?: string
          quote_ro?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_current_user_role: {
        Args: { _role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "editor"],
    },
  },
} as const
