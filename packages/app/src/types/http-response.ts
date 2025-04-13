import type express from "express";

export type HttpResponse = Omit<express.Response, "send">;
