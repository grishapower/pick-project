export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brackets: {
        Row: {
          bracket: Json | null
          bracket_type: Database["public"]["Enums"]["BRACKET_TYPE"]
          created_at: string
          id: string
          stage_id: string
          stage_type: Database["public"]["Enums"]["STAGE_ENUM"]
          tournament_id: string
        }
        Insert: {
          bracket?: Json | null
          bracket_type?: Database["public"]["Enums"]["BRACKET_TYPE"]
          created_at?: string
          id?: string
          stage_id: string
          stage_type?: Database["public"]["Enums"]["STAGE_ENUM"]
          tournament_id: string
        }
        Update: {
          bracket?: Json | null
          bracket_type?: Database["public"]["Enums"]["BRACKET_TYPE"]
          created_at?: string
          id?: string
          stage_id?: string
          stage_type?: Database["public"]["Enums"]["STAGE_ENUM"]
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "brackets_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "brackets_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      correct_answers: {
        Row: {
          answers_data: Json | null
          created_at: string
          id: number
          tournament_id: string
        }
        Insert: {
          answers_data?: Json | null
          created_at?: string
          id?: number
          tournament_id: string
        }
        Update: {
          answers_data?: Json | null
          created_at?: string
          id?: number
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "correct_answers_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: true
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      inventory: {
        Row: {
          created_at: string
          freebet_code: string | null
          id: number
          isNew: boolean
          name: string | null
          skin_id: number | null
          tournament_id: string
          type: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          used: boolean
          user_id: string
        }
        Insert: {
          created_at?: string
          freebet_code?: string | null
          id?: number
          isNew: boolean
          name?: string | null
          skin_id?: number | null
          tournament_id: string
          type?: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          used: boolean
          user_id: string
        }
        Update: {
          created_at?: string
          freebet_code?: string | null
          id?: number
          isNew?: boolean
          name?: string | null
          skin_id?: number | null
          tournament_id?: string
          type?: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          used?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "inventory_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "inventory_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      news: {
        Row: {
          created_at: string
          id: string
          img: string
          slug: string
          text: string
          text_en: string
          title: string
          title_en: string
        }
        Insert: {
          created_at?: string
          id?: string
          img?: string
          slug?: string
          text?: string
          text_en?: string
          title?: string
          title_en?: string
        }
        Update: {
          created_at?: string
          id?: string
          img?: string
          slug?: string
          text?: string
          text_en?: string
          title?: string
          title_en?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          archive: boolean
          created_at: string
          id: string
          is_read: boolean
          text: string
          text_en: string
          title: string
          title_en: string
          type: string
          user_id: string
        }
        Insert: {
          archive?: boolean
          created_at?: string
          id?: string
          is_read?: boolean
          text?: string
          text_en?: string
          title?: string
          title_en?: string
          type: string
          user_id: string
        }
        Update: {
          archive?: boolean
          created_at?: string
          id?: string
          is_read?: boolean
          text?: string
          text_en?: string
          title?: string
          title_en?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pickems: {
        Row: {
          created_at: string | null
          id: string
          stages: Json
          tournament_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          stages?: Json
          tournament_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          stages?: Json
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pickems_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pickems_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          nickname: string | null
          steam_data: Json | null
          steam_id: string | null
          steam_trade_link: string
          telegram_id: string | null
          user_pic: string | null
          view_onboarding: boolean
          web_notif_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nickname?: string | null
          steam_data?: Json | null
          steam_id?: string | null
          steam_trade_link?: string
          telegram_id?: string | null
          user_pic?: string | null
          view_onboarding?: boolean
          web_notif_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nickname?: string | null
          steam_data?: Json | null
          steam_id?: string | null
          steam_trade_link?: string
          telegram_id?: string | null
          user_pic?: string | null
          view_onboarding?: boolean
          web_notif_id?: string | null
        }
        Relationships: []
      }
      stages: {
        Row: {
          created_at: string
          end_date: string
          icon: Database["public"]["Enums"]["STAGE_ICON"]
          id: string
          name: string
          name_en: string
          serie_id_api: number | null
          stage_group: string
          stage_id_api: number | null
          stage_order: number
          start_date: string
          teams: number[]
          tournament_id: string
          type: Database["public"]["Enums"]["STAGE_ENUM"]
        }
        Insert: {
          created_at?: string
          end_date: string
          icon?: Database["public"]["Enums"]["STAGE_ICON"]
          id?: string
          name?: string
          name_en?: string
          serie_id_api?: number | null
          stage_group?: string
          stage_id_api?: number | null
          stage_order: number
          start_date: string
          teams: number[]
          tournament_id: string
          type: Database["public"]["Enums"]["STAGE_ENUM"]
        }
        Update: {
          created_at?: string
          end_date?: string
          icon?: Database["public"]["Enums"]["STAGE_ICON"]
          id?: string
          name?: string
          name_en?: string
          serie_id_api?: number | null
          stage_group?: string
          stage_id_api?: number | null
          stage_order?: number
          start_date?: string
          teams?: number[]
          tournament_id?: string
          type?: Database["public"]["Enums"]["STAGE_ENUM"]
        }
        Relationships: [
          {
            foreignKeyName: "stages_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_medal: {
        Row: {
          created_at: string
          id: number
          img_name: string
          text: string
          title: string
          tournament_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          img_name?: string
          text?: string
          title?: string
          tournament_id?: string
        }
        Update: {
          created_at?: string
          id?: number
          img_name?: string
          text?: string
          title?: string
          tournament_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tournament_medal_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_prizes: {
        Row: {
          created_at: string
          id: string
          img: string
          name: string
          prize_id: number | null
          region: Database["public"]["Enums"]["REGION_TYPE"]
          tournament_id: string
          type: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          win_position_end: number | null
          win_position_start: number
        }
        Insert: {
          created_at?: string
          id?: string
          img?: string
          name?: string
          prize_id?: number | null
          region?: Database["public"]["Enums"]["REGION_TYPE"]
          tournament_id: string
          type?: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          win_position_end?: number | null
          win_position_start?: number
        }
        Update: {
          created_at?: string
          id?: string
          img?: string
          name?: string
          prize_id?: number | null
          region?: Database["public"]["Enums"]["REGION_TYPE"]
          tournament_id?: string
          type?: Database["public"]["Enums"]["INVENTORY_ITEM_ENUM"]
          win_position_end?: number | null
          win_position_start?: number
        }
        Relationships: [
          {
            foreignKeyName: "tournament_prizes_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournament_tasks: {
        Row: {
          created_at: string
          id: string
          stage_id: string
          tournament_id: string
          type: Database["public"]["Enums"]["TASK_TYPE"]
        }
        Insert: {
          created_at?: string
          id?: string
          stage_id: string
          tournament_id: string
          type?: Database["public"]["Enums"]["TASK_TYPE"]
        }
        Update: {
          created_at?: string
          id?: string
          stage_id?: string
          tournament_id?: string
          type?: Database["public"]["Enums"]["TASK_TYPE"]
        }
        Relationships: [
          {
            foreignKeyName: "tournament_tasks_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "stages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tournament_tasks_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          created_at: string | null
          end_date: string
          full_name: string
          icon: string | null
          id: string
          img: string
          league_id_api: number
          name: string
          open: boolean
          serie_id_api: number
          slug: string
          start_date: string
        }
        Insert: {
          created_at?: string | null
          end_date: string
          full_name?: string
          icon?: string | null
          id?: string
          img?: string
          league_id_api: number
          name?: string
          open?: boolean
          serie_id_api: number
          slug?: string
          start_date: string
        }
        Update: {
          created_at?: string | null
          end_date?: string
          full_name?: string
          icon?: string | null
          id?: string
          img?: string
          league_id_api?: number
          name?: string
          open?: boolean
          serie_id_api?: number
          slug?: string
          start_date?: string
        }
        Relationships: []
      }
      user_medals: {
        Row: {
          created_at: string
          id: string
          level: number
          tournament_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          level?: number
          tournament_id?: string
          user_id?: string
        }
        Update: {
          created_at?: string
          id?: string
          level?: number
          tournament_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_medals_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_medals_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      BRACKET_TYPE:
        | "PLAYOFF_SINGLE_ELIMINATION_1"
        | "PLAYOFF_SINGLE_ELIMINATION_2"
        | "PLAYOFF_DOUBLE_ELIMINATION"
        | "GROUP_DEFAULT_1"
        | "GROUP_SWISS_1"
        | "NOMINATION_1"
        | "NOMINATION_2"
      INVENTORY_ITEM_ENUM: "SKIN" | "FREEBET"
      REGION_TYPE: "RU" | "EN"
      STAGE_ENUM: "GROUP" | "PLAYOFF" | "NOMINATION"
      STAGE_ICON: "nominationIcon" | "cupIcon" | "groupIcon" | "playoffIcon"
      TASK_TYPE: "WIN_5" | "WIN_7" | "SELECT_WINNER"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

