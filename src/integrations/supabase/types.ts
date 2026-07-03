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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      blog_posts: {
        Row: {
          category: string
          content: string
          created_at: string
          date: string
          excerpt: string
          id: string
          meta_description: string
          published: boolean
          read_time: string
          slug: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          meta_description?: string
          published?: boolean
          read_time?: string
          slug: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          date?: string
          excerpt?: string
          id?: string
          meta_description?: string
          published?: boolean
          read_time?: string
          slug?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      draw_noc_codes: {
        Row: {
          category: string
          created_at: string
          draw_number: number
          id: string
          noc_code: string
        }
        Insert: {
          category: string
          created_at?: string
          draw_number: number
          id?: string
          noc_code: string
        }
        Update: {
          category?: string
          created_at?: string
          draw_number?: number
          id?: string
          noc_code?: string
        }
        Relationships: []
      }
      express_entry_draws: {
        Row: {
          category: string
          created_at: string
          crs_min: number
          draw_date: string
          draw_number: number
          fetched_at: string
          id: string
          itas: number
          source_url: string | null
          tie_break: string | null
        }
        Insert: {
          category: string
          created_at?: string
          crs_min: number
          draw_date: string
          draw_number: number
          fetched_at?: string
          id?: string
          itas: number
          source_url?: string | null
          tie_break?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          crs_min?: number
          draw_date?: string
          draw_number?: number
          fetched_at?: string
          id?: string
          itas?: number
          source_url?: string | null
          tie_break?: string | null
        }
        Relationships: []
      }
      immigration_news: {
        Row: {
          category: string
          created_at: string
          external_id: string | null
          id: string
          published_at: string
          source_name: string
          source_url: string
          summary: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          external_id?: string | null
          id?: string
          published_at?: string
          source_name: string
          source_url: string
          summary?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          external_id?: string | null
          id?: string
          published_at?: string
          source_name?: string
          source_url?: string
          summary?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      ingestion_runs: {
        Row: {
          created_at: string
          error_message: string | null
          finished_at: string | null
          id: string
          items_upserted: number
          source: string
          started_at: string
          status: string
        }
        Insert: {
          created_at?: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          items_upserted?: number
          source: string
          started_at?: string
          status: string
        }
        Update: {
          created_at?: string
          error_message?: string | null
          finished_at?: string | null
          id?: string
          items_upserted?: number
          source?: string
          started_at?: string
          status?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          destination_country: string | null
          education_level: string | null
          email: string
          full_name: string
          id: string
          origin_country: string | null
          phone: string
          source_page: string | null
          visa_type: string | null
        }
        Insert: {
          created_at?: string
          destination_country?: string | null
          education_level?: string | null
          email: string
          full_name: string
          id?: string
          origin_country?: string | null
          phone: string
          source_page?: string | null
          visa_type?: string | null
        }
        Update: {
          created_at?: string
          destination_country?: string | null
          education_level?: string | null
          email?: string
          full_name?: string
          id?: string
          origin_country?: string | null
          phone?: string
          source_page?: string | null
          visa_type?: string | null
        }
        Relationships: []
      }
      noc_codes: {
        Row: {
          alt_titles: string[]
          category: string
          code: string
          created_at: string
          description: string
          express_entry_eligible: boolean
          id: string
          median_salary: number | null
          teer: number
          title: string
        }
        Insert: {
          alt_titles?: string[]
          category: string
          code: string
          created_at?: string
          description?: string
          express_entry_eligible?: boolean
          id?: string
          median_salary?: number | null
          teer: number
          title: string
        }
        Update: {
          alt_titles?: string[]
          category?: string
          code?: string
          created_at?: string
          description?: string
          express_entry_eligible?: boolean
          id?: string
          median_salary?: number | null
          teer?: number
          title?: string
        }
        Relationships: []
      }
      pnp_draws: {
        Row: {
          created_at: string
          draw_date: string
          fetched_at: string
          id: string
          invitations: number
          min_score: number | null
          notes: string | null
          province: string
          province_code: string
          source_url: string | null
          stream: string
        }
        Insert: {
          created_at?: string
          draw_date: string
          fetched_at?: string
          id?: string
          invitations: number
          min_score?: number | null
          notes?: string | null
          province: string
          province_code: string
          source_url?: string | null
          stream: string
        }
        Update: {
          created_at?: string
          draw_date?: string
          fetched_at?: string
          id?: string
          invitations?: number
          min_score?: number | null
          notes?: string | null
          province?: string
          province_code?: string
          source_url?: string | null
          stream?: string
        }
        Relationships: []
      }
      processing_times: {
        Row: {
          application_type: string
          created_at: string
          id: string
          processing_time_text: string
          updated_date: string
        }
        Insert: {
          application_type: string
          created_at?: string
          id?: string
          processing_time_text: string
          updated_date?: string
        }
        Update: {
          application_type?: string
          created_at?: string
          id?: string
          processing_time_text?: string
          updated_date?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
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
      get_last_ingested_at: { Args: never; Returns: string }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
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
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
